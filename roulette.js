// ----------------------
// ELEMENTS
// ----------------------

const track = document.getElementById("rouletteTrack")
const prizeList = document.getElementById("prizeList")
const openBtn = document.getElementById("openCaseBtn")

let spinning = false
let currentStrip = []

// ----------------------
// DROP TABLE
// ----------------------

const drops = [
{ name:"1 ⭐", chance:30 },
{ name:"2 ⭐", chance:22 },
{ name:"3 ⭐", chance:18 },
{ name:"5 ⭐", chance:14 },
{ name:"10 ⭐", chance:9 },
{ name:"25 ⭐", chance:5 },
{ name:"50 ⭐", chance:1.95 },
{ name:"100 ⭐", chance:0.05 }
]

// ----------------------
// SECURE RANDOM
// ----------------------

function random(){
const arr = new Uint32Array(1)
crypto.getRandomValues(arr)
return arr[0] / 4294967296
}

// ----------------------
// WEIGHTED RANDOM
// ----------------------

function rollDrop(){

let r = random()*100
let sum = 0

for(let item of drops){

sum += item.chance

if(r <= sum){
return item.name
}

}

return drops[0].name

}

// ----------------------
// BUILD ROULETTE
// ----------------------

function buildRoulette(){

track.innerHTML=""
currentStrip=[]

for(let i=0;i<120;i++){

let item = rollDrop()

currentStrip.push(item)

let div=document.createElement("div")
div.className="item"
div.innerText=item

track.appendChild(div)

}

}

// ----------------------
// SPIN
// ----------------------

function spinCase(){

if(spinning) return
spinning=true

openBtn.disabled=true

buildRoulette()

track.style.transition="none"
track.style.transform="translateX(0)"

setTimeout(()=>{

const item = track.querySelector(".item")
const itemWidth = item.offsetWidth
const gap = parseInt(getComputedStyle(track).gap) || 0
const step = itemWidth + gap

const roulette = document.querySelector(".roulette")
const center = roulette.offsetWidth/2 - itemWidth/2

// куда прокрутить
const targetIndex = 80

const distance = targetIndex * step - center

const spinTime = 6000

track.style.transition=`transform ${spinTime}ms cubic-bezier(.12,.7,.2,1)`
track.style.transform=`translateX(-${distance}px)`

setTimeout(()=>{

const win = currentStrip[targetIndex]

showWinPopup(win)

spinning=false
openBtn.disabled=false

},spinTime)

},50)

}

// ----------------------
// POPUP
// ----------------------

function showWinPopup(item){

const popup=document.getElementById("winPopup")
const winItem=document.getElementById("winItem")

winItem.innerText=item
popup.classList.add("show")

}

function closeWinPopup(){

document.getElementById("winPopup").classList.remove("show")

}

// ----------------------
// PRIZE LIST
// ----------------------

function renderPrizeList(){

if(!prizeList) return

prizeList.innerHTML=""

drops.forEach(item=>{

let row=document.createElement("div")
row.className="prize-row"

row.innerHTML=`
<div>${item.name}</div>
<div>${item.chance}%</div>
`

prizeList.appendChild(row)

})

}

// ----------------------

renderPrizeList()
