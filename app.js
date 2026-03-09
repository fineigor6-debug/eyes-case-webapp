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

// ----------------------
// ELEMENTS
// ----------------------

const track = document.getElementById("rouletteTrack")
const rollingDrop = document.getElementById("rollingDrop")

let spinning=false

// ----------------------
// DROP TABLE (АДМИН ВИДИТ)
// ----------------------

const dropTable=[

{ name:"1 ⭐", chance:45 },
{ name:"2 ⭐", chance:25 },
{ name:"3 ⭐", chance:15 },
{ name:"5 ⭐", chance:10 },
{ name:"10 ⭐", chance:4 },
{ name:"25 ⭐", chance:0.9 },
{ name:"50 ⭐", chance:0.1 }

]

// ----------------------
// ВЫБОР ДРОПА
// ----------------------

function rollDrop(){

let rand=Math.random()*100
let sum=0

for(let item of dropTable){

sum+=item.chance

if(rand<=sum){

// АДМИН ЛОГ
console.log("🎰 CASE DROP")
console.log("User:", user?.id)
console.log("Drop:", item.name)
console.log("Random:", rand)

return item

}

}

return dropTable[0]

}

// ----------------------
// BUILD ROULETTE
// ----------------------

function buildRoulette(winItem){

track.innerHTML=""

let strip=[]

// случайная лента
for(let i=0;i<60;i++){

let r=Math.floor(Math.random()*dropTable.length)

strip.push(dropTable[r].name)

}

// near miss
if(Math.random()<0.35){
strip[58]="50 ⭐"
}

// победитель
strip.push(winItem.name)

// создаем DOM
strip.forEach(name=>{

let div=document.createElement("div")

div.className="item"
div.innerText=name

track.appendChild(div)

})

return strip.length-1

}

// ----------------------
// SPIN CASE
// ----------------------

function spinCase(){

if(spinning) return

spinning=true

const openBtn=document.getElementById("openCaseBtn")
if(openBtn) openBtn.disabled=true

// результат определяется заранее
let winItem=rollDrop()

// строим рулетку вокруг результата
let winPosition=buildRoulette(winItem)

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

if(rollingDrop){
rollingDrop.innerText=winItem.name
}

alert("Вы выиграли: "+winItem.name)

spinning=false

if(openBtn) openBtn.disabled=false

},spinTime)

},50)

}
