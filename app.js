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
const prizeList = document.getElementById("prizeList")
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

let chances=[]

// ----------------------
// ECONOMY
// ----------------------

const testCaseChances=[

45,
25,
15,
10,
4,
0.9,
0.1

]

// ----------------------
// GENERATE CHANCES
// ----------------------

function generateChances(){

if(caseType==="test"){

chances=[...testCaseChances]

}else{

let total=0
chances=[]

for(let i=0;i<items.length;i++){

let v=Math.random()
chances.push(v)
total+=v

}

for(let i=0;i<chances.length;i++){
chances[i]=(chances[i]/total*100)
}

}

renderPrizeList()

}

// ----------------------
// PRIZE LIST
// ----------------------

function renderPrizeList(){

if(!prizeList) return

prizeList.innerHTML=""

items.forEach((item,i)=>{

let row=document.createElement("div")
row.className="prize-row"

row.innerHTML=`
<div>${item.name}</div>
<div>${chances[i].toFixed(2)}%</div>
`

prizeList.appendChild(row)

})

}

// ----------------------
// PICK WINNER
// ----------------------

function pickWinner(){

let rand=Math.random()*100
let sum=0

for(let i=0;i<chances.length;i++){

sum+=parseFloat(chances[i])

if(rand<=sum){
return i
}

}

return 0

}

// ----------------------
// BUILD ROULETTE
// ----------------------

function buildRoulette(winnerIndex){

track.innerHTML=""
strip=[]

// случайная лента
for(let i=0;i<60;i++){

strip.push(
Math.floor(Math.random()*items.length)
)

}

// near miss
if(Math.random()<0.35){
strip[57]=items.length-1
}

// позиция победителя
let winPosition=strip.length
strip.push(winnerIndex)

// создаем DOM
strip.forEach(index=>{

let div=document.createElement("div")
div.className="item"
div.innerText=items[index].name

track.appendChild(div)

})

return winPosition

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

generateChances()

let winnerIndex=pickWinner()

let winPosition=buildRoulette(winnerIndex)

syncRollingDrop()

track.style.transition="none"
track.style.transform="translateX(0px)"

setTimeout(()=>{

const itemWidth=105

const centerOffset=(window.innerWidth/2)-(itemWidth/2)

const distance=(winPosition*itemWidth)-centerOffset

let spinTime=5000+Math.random()*1500

track.style.transition=`transform ${spinTime}ms cubic-bezier(.05,.9,.15,1)`
track.style.transform=`translateX(-${distance}px)`

setTimeout(()=>{

clearInterval(syncInterval)

if(rollingDrop){
rollingDrop.innerText=items[winnerIndex].name
}

alert("Вы выиграли: "+items[winnerIndex].name)

spinning=false
if(openBtn) openBtn.disabled=false

},spinTime)

},50)

}

// ----------------------
// INIT
// ----------------------

generateChances()
