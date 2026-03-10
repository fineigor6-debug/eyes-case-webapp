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
// DYNAMIC RTP
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

if(!track) return 0

track.innerHTML = ""

let strip = []
let winIndex = 0

for(let i=0;i<70;i++){

let r = Math.floor(random()*dropTable.length)
strip.push(dropTable[r].name)

}

if(random()<0.5){

let rare = dropTable[dropTable.length-2].name
strip.push(rare)

}

winIndex = strip.length
strip.push(winItem.name)

for(let i=0;i<20;i++){

let r = Math.floor(random()*dropTable.length)
strip.push(dropTable[r].name)

}

strip.forEach(name=>{

let div = document.createElement("div")

div.className = "item"
div.innerText = name

track.appendChild(div)

})

return winIndex

}

// ----------------------
// SPIN
// ----------------------

function spinCase(){

if(spinning) return
spinning = true

if(openBtn) openBtn.disabled = true

let winItem = rollDrop()

let winPos = buildRoulette(winItem)

track.style.transition = "none"
track.style.transform = "translateX(0px)"

setTimeout(()=>{

const item = track.querySelector(".item")
const itemWidth = item ? item.offsetWidth : 90

// получаем gap из CSS
const style = window.getComputedStyle(track)
const gap = parseInt(style.columnGap || style.gap) || 0

// padding
const paddingLeft = parseInt(style.paddingLeft) || 0

const totalItemWidth = itemWidth + gap

const centerOffset = (window.innerWidth/2)-(itemWidth/2)

const distance = (winPos * totalItemWidth) - centerOffset + paddingLeft

let spinTime = 6000 + random()*2000

track.style.transition = `transform ${spinTime}ms cubic-bezier(.08,.85,.15,1)`
track.style.transform = `translateX(-${distance}px)`

setTimeout(()=>{

showWinPopup(winItem.name)

spinning = false

if(openBtn) openBtn.disabled = false

},spinTime)

},60)

}

// ----------------------
// WIN POPUP
// ----------------------

function showWinPopup(item){

const popup = document.getElementById("winPopup")
const winItem = document.getElementById("winItem")

if(!popup) return

winItem.innerText = item

popup.classList.add("show")

}

function closeWinPopup(){

const popup = document.getElementById("winPopup")
popup.classList.remove("show")

}

// ----------------------
// RENDER PRIZES
// ----------------------

function renderPrizeList(){

if(!prizeList) return

prizeList.innerHTML = ""

dropTable.forEach(item=>{

let row = document.createElement("div")

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
