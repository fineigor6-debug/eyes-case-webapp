// ----------------------
// ELEMENTS
// ----------------------

const track = document.getElementById("rouletteTrack")
const prizeList = document.getElementById("prizeList")
const openBtn = document.getElementById("openCaseBtn")

let spinning = false

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
// RANDOM SECURE
// ----------------------

function random(){
const arr = new Uint32Array(1)
crypto.getRandomValues(arr)
return arr[0] / 4294967296
}

// ----------------------
// DROP ROLL
// ----------------------

function rollDrop(){

let r = random()*100
let sum = 0

for(let item of drops){

sum += item.chance

if(r <= sum){
return item
}

}

return drops[0]

}

// ----------------------
// BUILD ROULETTE
// ----------------------

function buildRoulette(winItem){

track.innerHTML = ""

const TOTAL = 140
const WIN_SLOT = 100

let strip = []

for(let i=0;i<TOTAL;i++){

let rand = drops[Math.floor(random()*drops.length)]
strip.push(rand.name)

}

// near miss
if(random() < 0.6){

strip[WIN_SLOT-1] = "50 ⭐"
strip[WIN_SLOT+1] = "50 ⭐"

}

strip[WIN_SLOT] = winItem.name

strip.forEach(name=>{

const div = document.createElement("div")
div.className = "item"
div.innerText = name

track.appendChild(div)

})

return WIN_SLOT

}

// ----------------------
// SPIN
// ----------------------

function spinCase(){

if(spinning) return
spinning = true

openBtn.disabled = true

const winItem = rollDrop()
const winIndex = buildRoulette(winItem)

track.style.transition = "none"
track.style.transform = "translateX(0px)"

setTimeout(()=>{

const item = track.querySelector(".item")

const itemWidth = item.offsetWidth
const gap = parseInt(getComputedStyle(track).gap)

const step = itemWidth + gap

const roulette = document.querySelector(".roulette")
const center = roulette.offsetWidth/2 - itemWidth/2

const distance = winIndex * step - center

const spinTime = 5500 + random()*1500

track.style.transition = `transform ${spinTime}ms cubic-bezier(.1,.7,.15,1)`
track.style.transform = `translateX(-${distance}px)`

setTimeout(()=>{

showWinPopup(winItem.name)

spinning = false
openBtn.disabled = false

},spinTime)

},50)

}

// ----------------------
// POPUP
// ----------------------

function showWinPopup(item){

const popup = document.getElementById("winPopup")
const winItem = document.getElementById("winItem")

winItem.innerText = item

popup.classList.add("show")

}

function closeWinPopup(){

document.getElementById("winPopup").classList.remove("show")

}

// ----------------------
// RENDER PRIZES
// ----------------------

function renderPrizeList(){

prizeList.innerHTML = ""

drops.forEach(item=>{

const row = document.createElement("div")

row.className = "prize-row"

row.innerHTML = `
<div>${item.name}</div>
<div>${item.chance}%</div>
`

prizeList.appendChild(row)

})

}

// ----------------------
// INIT
// ----------------------

renderPrizeList()
