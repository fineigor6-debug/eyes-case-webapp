// ----------------------
// TELEGRAM
// ----------------------

const tg = window.Telegram.WebApp
tg.expand()

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
// LIVE DROPS
// ----------------------

const dropsTrack = document.getElementById("dropsTrack")

if(dropsTrack){

const users = [
"Alex","Ivan","Max","Leo","Nick","Artem","Den"
]

const dropItems = [
"🧸","🍫","💎","🍩","🎁","🍬","🍰"
]

function createDrop(){

const user = users[Math.floor(Math.random()*users.length)]
const item = dropItems[Math.floor(Math.random()*dropItems.length)]

const card = document.createElement("div")

card.className="drop-card"

card.innerHTML=`
<div>${item}</div>
<div class="drop-user">${user}</div>
`

dropsTrack.appendChild(card)

if(dropsTrack.children.length > 15){
dropsTrack.removeChild(dropsTrack.firstChild)
}

}

setInterval(createDrop,2000)

}

// ----------------------
// НАВИГАЦИЯ
// ----------------------

function openCases(){
window.location.href = "cases.html"
}

function openCase(){
window.location.href = "case.html"
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

// ----------------------
// ЗАГОЛОВОК 3 ЭКРАНА
// ----------------------

const title = document.getElementById("caseTitle")
const caseType = localStorage.getItem("caseType")

if(title){

if(caseType === "test"){
title.innerText="Тестовый кейс"
}else{
title.innerText="Ежедневный кейс"
}

}

// ----------------------
// РУЛЕТКА
// ----------------------

const track = document.getElementById("rouletteTrack")
const prizeList = document.getElementById("prizeList")

let items = [

{icon:"🍭",name:"Candy"},
{icon:"🍬",name:"Sweet"},
{icon:"🍰",name:"Cake"},
{icon:"🍩",name:"Donut"},
{icon:"🍫",name:"Chocolate"},
{icon:"🍪",name:"Cookie"}

]

let chances=[]
let spinning=false

// ----------------------
// генерация шансов
// ----------------------

function generateChances(){

chances=[]
let total=0

for(let i=0;i<items.length;i++){

let value=Math.random()

chances.push(value)
total+=value

}

for(let i=0;i<chances.length;i++){

chances[i]=(chances[i]/total*100).toFixed(2)

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
<div class="prize-name">${item.icon} ${item.name}</div>
<div class="prize-chance">${chances[i]}%</div>
`

prizeList.appendChild(row)

})

}

// ----------------------
// построение рулетки
// ----------------------

function buildRoulette(){

if(!track) return

track.innerHTML=""

let pool=[]

items.forEach((item,i)=>{

let count=Math.round(chances[i])

for(let j=0;j<count;j++){
pool.push(item)
}

})

for(let i=0;i<80;i++){

let random = pool[Math.floor(Math.random()*pool.length)]

let div=document.createElement("div")

div.className="item"

div.innerHTML=random.icon

track.appendChild(div)

}

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
// запуск кейса
// ----------------------

function spinCase(){

if(spinning) return

spinning = true

const openBtn = document.getElementById("openCaseBtn")
if(openBtn) openBtn.disabled = true

generateChances()
buildRoulette()

// СБРОС РУЛЕТКИ
track.style.transition="none"
track.style.transform="translateX(0px)"

setTimeout(()=>{

let winnerIndex = pickWinner()

let stopPosition=(winnerIndex*100)+2500

track.style.transition="transform 5s cubic-bezier(.1,.7,.1,1)"
track.style.transform=`translateX(-${stopPosition}px)`

setTimeout(()=>{

alert("Вы выиграли: "+items[winnerIndex].name)

spinning=false
if(openBtn) openBtn.disabled=false

},5000)

},50)

// cooldown для daily

if(caseType === "daily"){

localStorage.setItem("dailyCaseTime", Date.now())

}

}

// ----------------------
// DAILY CASE TIMER
// ----------------------

const openBtn = document.getElementById("openCaseBtn")
const timer = document.getElementById("cooldownTimer")

const cooldown = 24 * 60 * 60 * 1000

function checkCooldown(){

if(!openBtn) return

if(caseType !== "daily") return

const lastOpen = localStorage.getItem("dailyCaseTime")

if(!lastOpen) return

const now = Date.now()

const diff = now - lastOpen

if(diff < cooldown){

openBtn.disabled = true

updateTimer(cooldown - diff)

}

}

function updateTimer(time){

setInterval(()=>{

time -= 1000

if(time <= 0){

openBtn.disabled = false

if(timer){
timer.innerText="Кейс снова доступен!"
}

return

}

let hours = Math.floor(time / 3600000)
let minutes = Math.floor((time % 3600000) / 60000)
let seconds = Math.floor((time % 60000) / 1000)

if(timer){

timer.innerText =
`Следующий кейс через ${hours}ч ${minutes}м ${seconds}с`

}

},1000)

}

// ----------------------
// ПЕРВИЧНАЯ ГЕНЕРАЦИЯ
// ----------------------

generateChances()
buildRoulette()

checkCooldown()
