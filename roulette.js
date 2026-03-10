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

let dropTable = [

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
// RANDOM
// ----------------------

function random(){

const arr = new Uint32Array(1)
crypto.getRandomValues(arr)

return arr[0] / 4294967296

}

// ----------------------
// RTP
// ----------------------

let badLuck = 0

function rollDrop(){

let modifiedTable = [...dropTable]

if(badLuck > 10){

modifiedTable[4].chance += 2
modifiedTable[5].chance += 1

}

let r = random()*100
let sum = 0

for(let item of modifiedTable){

sum += item.chance

if(r <= sum){

if(
item.name.includes("10") ||
item.name.includes("25") ||
item.name.includes("50") ||
item.name.includes("100")
){
badLuck = 0
}else{
badLuck++
}

return item

}

}

return modifiedTable[0]

}

// ----------------------
// BUILD ROULETTE
// ----------------------

function buildRoulette(winItem){

track.innerHTML=""

const TOTAL_ITEMS = 120
const WIN_POSITION = 80

let strip = []

for(let i=0;i<TOTAL_ITEMS;i++){

let r = Math.floor(random()*dropTable.length)
strip.push(dropTable[r].name)

}

strip[WIN_POSITION] = winItem.name

strip.forEach(name=>{

let div = document.createElement("div")
div.className="item"
div.innerText=name

track.appendChild(div)

})

return WIN_POSITION

}

// ----------------------
// SPIN
// ----------------------

function spinCase(){

if(spinning) return
spinning = true

if(openBtn) openBtn.disabled=true

let winItem = rollDrop()
let winPos = buildRoulette(winItem)

track.style.transition="none"
track.style.transform="translateX(0px)"

setTimeout(()=>{

const item = track.querySelector(".item")

const itemWidth = item.offsetWidth
const gap = parseInt(window.getComputedStyle(track).gap) || 0

const totalWidth = itemWidth + gap

const roulette = document.querySelector(".roulette")
const center = roulette.offsetWidth/2 - itemWidth/2

const distance = winPos*totalWidth - center

let spinTime = 6000 + random()*2000

track.style.transition=`transform ${spinTime}ms cubic-bezier(.08,.85,.15,1)`
track.style.transform=`translateX(-${distance}px)`

setTimeout(()=>{

showWinPopup(winItem.name)

spinning=false
if(openBtn) openBtn.disabled=false

},spinTime)

},50)

}

// ----------------------
// WIN POPUP
// ----------------------

function showWinPopup(item){

const popup = document.getElementById("winPopup")
const winItem = document.getElementById("winItem")

if(!popup) return

winItem.innerText=item
popup.classList.add("show")

}

function closeWinPopup(){

document.getElementById("winPopup").classList.remove("show")

}

// ----------------------
// RENDER PRIZES
// ----------------------

function renderPrizeList(){

if(!prizeList) return

prizeList.innerHTML=""

dropTable.forEach(item=>{

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
// INIT
// ----------------------

renderPrizeList()
