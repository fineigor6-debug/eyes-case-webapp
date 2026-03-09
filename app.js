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
// НАВИГАЦИЯ
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
// ТИП КЕЙСА
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
// ЭЛЕМЕНТЫ
// ----------------------

const track = document.getElementById("rouletteTrack")
const prizeList = document.getElementById("prizeList")
const rollingDrop = document.getElementById("rollingDrop")

let spinning=false
let syncInterval=null

// ----------------------
// ПРЕДМЕТЫ
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
// ЭКОНОМИКА
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
// генерация шансов
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
// список призов
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
// выбор победителя
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
// WEIGHTED VISUAL STRIP
// ----------------------

function generateWeightedPool(){

let pool=[]

items.forEach((item,i)=>{

let count=Math.round(chances[i]*2)

for(let j=0;j<count;j++){
pool.push(i)
}

})

return pool

}

// ----------------------
// BUILD PROFESSIONAL ROULETTE
// ----------------------

function buildRoulette(winnerIndex){

track.innerHTML=""

let pool=generateWeightedPool()

// основная лента
let strip=[]

for(let i=0;i<70;i++){
strip.push(pool[Math.floor(Math.random()*pool.length)])
}

// ----------------------
// NEAR MISS ENGINE
// ----------------------

if(Math.random()<0.35){

let rareIndex=items.length-1
let pos=strip.length-3

strip[pos]=rareIndex

}

// вставляем победителя
strip.push(winnerIndex)

// ----------------------
// создаем элементы
// ----------------------

let winElement=null

strip.forEach((index,i)=>{

let div=document.createElement("div")

div.className="item"

if(index>=5){
div.classList.add("rare")
}

div.innerText=items[index].name

if(i===strip.length-1){
div.classList.add("win")
winElement=div
}

track.appendChild(div)

})

return winElement

}

// ----------------------
// SYNC DROP
// ----------------------

function syncRollingDrop(){

syncInterval=setInterval(()=>{

const elements=document.querySelectorAll(".item")
if(!elements.length) return

const pointerX=window.innerWidth/2

let closest=null
let minDistance=9999

elements.forEach(el=>{

let rect=el.getBoundingClientRect()
let center=rect.left+rect.width/2

let dist=Math.abs(pointerX-center)

if(dist<minDistance){

minDistance=dist
closest=el

}

})

if(closest && rollingDrop){
rollingDrop.innerText=closest.innerText
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

let winElement=buildRoulette(winnerIndex)

syncRollingDrop()

track.style.transition="none"
track.style.transform="translateX(0px)"

setTimeout(()=>{

const rect=winElement.getBoundingClientRect()
const trackRect=track.getBoundingClientRect()

const distance=rect.left-trackRect.left-(window.innerWidth/2)+(rect.width/2)

// variable spin time
let spinTime=4500+Math.random()*2000

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
