// ----------------------
// TELEGRAM
// ----------------------

const tg = window.Telegram.WebApp
tg.ready()

// ----------------------
// USER DATA
// ----------------------

const user = tg.initDataUnsafe?.user

if(user){

const username = document.getElementById("username")
const avatar = document.getElementById("avatar")

if(username){
username.innerText = user.first_name || "Player"
}

if(avatar && user.photo_url){
avatar.src = user.photo_url
}

}

// ----------------------
// NAVIGATION
// ----------------------

function openCases(){
window.location.href="cases.html"
}

function openCase(){
window.location.href="case.html"
}

function goBack(){
window.history.back()
}

// ----------------------
// CASE TYPE
// ----------------------

function openDailyCase(){
localStorage.setItem("caseType","daily")
window.location.href="case.html"
}

function openTestCase(){
localStorage.setItem("caseType","test")
window.location.href="case.html"
}

const caseType = localStorage.getItem("caseType")

// ----------------------
// ELEMENTS
// ----------------------

const track = document.getElementById("rouletteTrack")
const rollingDrop = document.getElementById("rollingDrop")

let spinning=false
let syncInterval=null
let strip=[]

// ----------------------
// ITEMS
// ----------------------

let items=[

{name:"1 ⭐"},
{name:"2 ⭐"},
{name:"3 ⭐"},
{name:"5 ⭐"},
{name:"10 ⭐"},
{name:"25 ⭐"},
{name:"50 ⭐"}

]

// ----------------------
// BUILD ROULETTE
// ----------------------

function buildRoulette(){

track.innerHTML=""
strip=[]

// длинная случайная лента
for(let i=0;i<80;i++){

let randomIndex=Math.floor(Math.random()*items.length)

strip.push(randomIndex)

let div=document.createElement("div")
div.className="item"
div.innerText=items[randomIndex].name

track.appendChild(div)

}

}

// ----------------------
// SYNC DROP
// ----------------------

function syncRollingDrop(){

const itemWidth=105

syncInterval=setInterval(()=>{

let transform=track.style.transform
let currentX=0

if(transform.includes("translateX")){
currentX=parseFloat(transform.split("(")[1])
}

let index=Math.floor(Math.abs(currentX)/itemWidth)

if(strip[index]!==undefined && rollingDrop){
rollingDrop.innerText=items[strip[index]].name
}

},16)

}

// ----------------------
// SPIN CASE
// ----------------------

function spinCase(){

if(spinning) return

spinning=true

const openBtn=document.getElementById("openCaseBtn")
if(openBtn) openBtn.disabled=true

buildRoulette()

syncRollingDrop()

track.style.transition="none"
track.style.transform="translateX(0px)"

setTimeout(()=>{

const itemWidth=105

const centerOffset=(window.innerWidth/2)-(itemWidth/2)

// случайная остановка
let stopIndex=50+Math.floor(Math.random()*20)

const distance=(stopIndex*itemWidth)-centerOffset

let spinTime=5000+Math.random()*1500

track.style.transition=`transform ${spinTime}ms cubic-bezier(.05,.9,.15,1)`
track.style.transform=`translateX(-${distance}px)`

setTimeout(()=>{

clearInterval(syncInterval)

// определяем выигрыш
let winIndex=strip[stopIndex]

let winItem=items[winIndex].name

if(rollingDrop){
rollingDrop.innerText=winItem
}

alert("Вы выиграли: "+winItem)

spinning=false
if(openBtn) openBtn.disabled=false

},spinTime)

},50)

}
