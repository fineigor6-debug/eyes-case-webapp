// TELEGRAM WEBAPP

const tg = window.Telegram.WebApp

tg.expand()

// USER DATA

const user = tg.initDataUnsafe?.user

if(user){

document.getElementById("username").innerText =
user.first_name || "Player"

if(user.photo_url){
document.getElementById("avatar").src = user.photo_url
}

}


// ПЕРЕХОД НА ЭКРАН КЕЙСОВ

function openCases(){

window.location.href = "cases.html"

}


// ПЕРЕХОД НА ЭКРАН ОТКРЫТИЯ КЕЙСА

function openCase(){

window.location.href = "case.html"

}



// ----------------------
// РУЛЕТКА
// ----------------------

const track = document.getElementById("rouletteTrack")
const prizeList = document.getElementById("prizeList")


// ПРЕДМЕТЫ КЕЙСА

let items = [

{icon:"🍭", name:"Candy"},
{icon:"🍬", name:"Sweet"},
{icon:"🍰", name:"Cake"},
{icon:"🍩", name:"Donut"},
{icon:"🍫", name:"Chocolate"},
{icon:"🍪", name:"Cookie"}

]

let chances = []


// ГЕНЕРАЦИЯ СЛУЧАЙНЫХ ШАНСОВ

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


// ОТОБРАЖЕНИЕ ТАБЛИЦЫ ШАНСОВ

function renderPrizeList(){

if(!prizeList) return

prizeList.innerHTML=""

items.forEach((item,i)=>{

let row=document.createElement("div")

row.className="prize-row"

row.innerHTML=`

<div class="prize-name">
${item.icon} ${item.name}
</div>

<div class="prize-chance">
${chances[i]}%
</div>

`

prizeList.appendChild(row)

})

}



// СОЗДАНИЕ ЛЕНТЫ РУЛЕТКИ

function buildRoulette(){

if(!track) return

track.innerHTML=""

let pool=[]


// СОЗДАЕМ ПУЛ ПРЕДМЕТОВ ПО ВЕРОЯТНОСТИ

items.forEach((item,i)=>{

let count=Math.round(chances[i])

for(let j=0;j<count;j++){

pool.push(item)

}

})


// ЗАПОЛНЯЕМ ЛЕНТУ

for(let i=0;i<80;i++){

let random = pool[Math.floor(Math.random()*pool.length)]

let div=document.createElement("div")

div.className="item"

div.innerHTML=random.icon

track.appendChild(div)

}

}



// ВЫБОР ПОБЕДИТЕЛЯ

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



// ЗАПУСК РУЛЕТКИ

function spinCase(){

generateChances()

buildRoulette()

let winnerIndex = pickWinner()


let stopPosition = (winnerIndex * 100) + 2500


track.style.transition =
"transform 5s cubic-bezier(.1,.7,.1,1)"

track.style.transform =
`translateX(-${stopPosition}px)`


// ПОСЛЕ 5 СЕКУНД

setTimeout(()=>{

alert("Вы выиграли: " + items[winnerIndex].name)

},5000)

}



// ПЕРВИЧНАЯ ГЕНЕРАЦИЯ

generateChances()
buildRoulette()
