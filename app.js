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
// РУЛЕТКА
// ----------------------

const track = document.getElementById("rouletteTrack")
const prizeList = document.getElementById("prizeList")
const rollingDrop = document.getElementById("rollingDrop")

let spinning=false

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
<div>${chances[i]}%</div>
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
// построение рулетки
// ----------------------

function buildRoulette(winnerIndex){

track.innerHTML=""

let pool=[]

items.forEach((item,i)=>{

let count=Math.round(chances[i])

for(let j=0;j<count;j++){
pool.push(item)
}

})

// случайная часть
for(let i=0;i<60;i++){

let random=pool[Math.floor(Math.random()*pool.length)]

let div=document.createElement("div")
div.className="item"
div.innerText=random.name

track.appendChild(div)

}

// near miss
let nearIndex=Math.min(winnerIndex+1,items.length-1)

let near=document.createElement("div")
near.className="item rare"
near.innerText=items[nearIndex].name
track.appendChild(near)

// победитель
let win=document.createElement("div")
win.className="item win"
win.innerText=items[winnerIndex].name
track.appendChild(win)

}

// ----------------------
// запуск кейса
// ----------------------

function spinCase(){

if(spinning) return

spinning=true

const openBtn=document.getElementById("openCaseBtn")
if(openBtn) openBtn.disabled=true

generateChances()

let winnerIndex=pickWinner()

buildRoulette(winnerIndex)

// ----------------------
// отображение дропа
// ----------------------

let roll=setInterval(()=>{

let random=Math.floor(Math.random()*items.length)

if(rollingDrop){
rollingDrop.innerText=items[random].name
}

},120)

// ----------------------
// старт вращения
// ----------------------

track.style.transition="none"
track.style.transform="translateX(0px)"

setTimeout(()=>{

let distance=track.scrollWidth-420

// slow motion easing
track.style.transition="transform 7s cubic-bezier(.05,.9,.15,1)"
track.style.transform=`translateX(-${distance}px)`

setTimeout(()=>{

clearInterval(roll)

if(rollingDrop){
rollingDrop.innerText=items[winnerIndex].name
}

alert("Вы выиграли: "+items[winnerIndex].name)

spinning=false
if(openBtn) openBtn.disabled=false

},7000)

},50)

}

// ----------------------
// INIT
// ----------------------

generateChances()
