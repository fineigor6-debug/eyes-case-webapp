// TELEGRAM

const tg = window.Telegram.WebApp
tg.expand()

// USER DATA

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

// открыть экран кейсов

function openCases(){

window.location.href = "cases.html"

}

// открыть кейс

function openCase(){

window.location.href = "case.html"

}

// кнопка назад

function goBack(){

window.history.back()

}



// ----------------------
// РУЛЕТКА (3 экран)
// ----------------------

const track = document.getElementById("rouletteTrack")
const prizeList = document.getElementById("prizeList")


// предметы кейса

let items = [

{icon:"🍭",name:"Candy"},
{icon:"🍬",name:"Sweet"},
{icon:"🍰",name:"Cake"},
{icon:"🍩",name:"Donut"},
{icon:"🍫",name:"Chocolate"},
{icon:"🍪",name:"Cookie"}

]

let chances=[]


// генерация случайных шансов

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


// вывод таблицы призов

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


// создание рулетки

function buildRoulette(){

if(!track) return

track.innerHTML=""

let pool=[]


// формируем пул по шансам

items.forEach((item,i)=>{

let count=Math.round(chances[i])

for(let j=0;j<count;j++){

pool.push(item)

}

})


// создаем ленту

for(let i=0;i<80;i++){

let random = pool[Math.floor(Math.random()*pool.length)]

let div=document.createElement("div")

div.className="item"

div.innerHTML=random.icon

track.appendChild(div)

}

}


// выбор победителя

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


// запуск рулетки

function spinCase(){

generateChances()
buildRoulette()

let winnerIndex=pickWinner()

let stopPosition=(winnerIndex*100)+2500

track.style.transition="transform 5s cubic-bezier(.1,.7,.1,1)"

track.style.transform=`translateX(-${stopPosition}px)`


// результат через 5 секунд

setTimeout(()=>{

alert("Вы выиграли: "+items[winnerIndex].name)

},5000)

}


// первичная генерация

generateChances()
buildRoulette()

// ----------------
// DAILY CASE TIMER
// ----------------

const openBtn = document.getElementById("openCaseBtn")
const timer = document.getElementById("cooldownTimer")

const cooldown = 24 * 60 * 60 * 1000

function checkCooldown(){

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

timer.innerText="Кейс снова доступен!"

return

}

let hours = Math.floor(time / 3600000)
let minutes = Math.floor((time % 3600000) / 60000)
let seconds = Math.floor((time % 60000) / 1000)

timer.innerText =
`Следующий кейс через ${hours}ч ${minutes}м ${seconds}с`

},1000)

}


// ОБНОВЛЯЕМ spinCase

const oldSpin = spinCase

spinCase = function(){

localStorage.setItem("dailyCaseTime", Date.now())

oldSpin()

checkCooldown()

}


// ПРИ ЗАГРУЗКЕ

checkCooldown()

// функции для тест кейса

function openDailyCase(){

localStorage.setItem("caseType","daily")

window.location.href="case.html"

}

function openTestCase(){

localStorage.setItem("caseType","test")

window.location.href="case.html"

}
