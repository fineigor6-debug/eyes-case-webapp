// ----------------------
// ELEMENTS
// ----------------------

const track = document.getElementById("rouletteTrack")
const prizeList = document.getElementById("prizeList")
const openBtn = document.getElementById("openCaseBtn")

let spinning = false
let currentStrip = []

// PITY SYSTEM
let pityCounter = parseInt(localStorage.getItem("pityCounter")) || 0

// ----------------------
// DROP TABLE
// ----------------------

let dropTable = [

{name:"20 Stars", img:"FB980B4D-F31F-41D8-8C91-2F387F84916A.png", chance:36},
{name:"60 Stars", img:"8F520D99-B3FB-43F8-B182-9C877B7B08C9.png", chance:27},
{name:"120 Stars", img:"D8191BBE-8762-41A4-A2C2-17EC9F8F63DE.png", chance:18},
{name:"250 Stars", img:"3CFA93BA-A42F-40B7-9B1E-34B8566D62CE.png", chance:10},

{name:"Magic Potion", img:"IMG_0667.jpeg", chance:5},
{name:"Ion Gem", img:"IMG_0668.webp", chance:2.5},
{name:"Mini Oscar", img:"IMG_0669.webp", chance:0.9},
{name:"Heroic Helmet", img:"IMG_0670.jpeg", chance:0.4},
{name:"Precious Peach", img:"IMG_0671.webp", chance:0.15},
{name:"Durov's Cap", img:"IMG_0672.webp", chance:0.05}

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
// WEIGHTED RANDOM + PITY
// ----------------------

function rollDrop(){

let r = random()*100
let sum = 0
let pityBoost = pityCounter * 0.4

for(let item of dropTable){

let chance = item.chance

if(item.chance < 1){
chance += pityBoost
}

sum += chance

if(r <= sum){

if(item.chance < 1){
pityCounter = 0
}else{
pityCounter++
}

localStorage.setItem("pityCounter", pityCounter)
return item

}

}

pityCounter++
localStorage.setItem("pityCounter", pityCounter)

return dropTable[0]

}

// ----------------------
// BUILD ROULETTE
// ----------------------

function buildRoulette(){

if(!track) return

track.innerHTML=""
currentStrip=[]

const winItem = rollDrop()
const winIndex = 80

for(let i=0;i<120;i++){

let item

if(i === winIndex){

item = winItem

}

else if(i === winIndex-1 || i === winIndex+1){

const rareItems = dropTable.slice(-4)
item = rareItems[Math.floor(random()*rareItems.length)]

}

else{

item = rollDrop()

}

currentStrip.push(item)

let div=document.createElement("div")
div.className="item"

div.innerHTML=`<img src="${item.img}">`

if(item.chance < 1){
div.style.border="2px solid gold"
div.style.boxShadow="0 0 12px gold"
}

track.appendChild(div)

}

}

// ----------------------
// SPIN
// ----------------------

function spinCase(){

if(!track || !openBtn) return

// защита если предыдущий спин завис
if(spinning){
return
}

spinning = true
openBtn.disabled = true

track.style.transition = "none"
track.style.transform = "translateX(0px)"

buildRoulette()

setTimeout(()=>{

const item = track.querySelector(".item")
if(!item){
spinning=false
openBtn.disabled=false
return
}

const itemWidth = item.offsetWidth
const gap = parseInt(getComputedStyle(track).gap) || 0
const step = itemWidth + gap

const roulette = document.querySelector(".roulette")
if(!roulette){
spinning=false
openBtn.disabled=false
return
}

const center = roulette.offsetWidth/2 - itemWidth/2

const targetIndex = 80
const distance = targetIndex * step - center

const spinTime = 6000 + random()*2000

track.style.transition = `transform ${spinTime}ms cubic-bezier(.12,.7,.2,1)`
track.style.transform = `translateX(-${distance}px)`

setTimeout(()=>{

const win = currentStrip[targetIndex]

showWinPopup(win)

addCaseOpened()

spinning=false
openBtn.disabled=false

},spinTime)

},100)

}

// ----------------------
// POPUP
// ----------------------

function showWinPopup(item){

const popup=document.getElementById("winPopup")
const winItem=document.getElementById("winItem")

if(!popup || !winItem) return

winItem.innerHTML=`
<img src="${item.img}" style="width:90px;margin-bottom:10px"><br>
${item.name}
`

saveToInventory(item)

if(window.updateBestDrop){
updateBestDrop(item)
}
popup.classList.add("show")

}

function closeWinPopup(){

const popup=document.getElementById("winPopup")

if(popup){
popup.classList.remove("show")
}

spinning=false
if(openBtn) openBtn.disabled=false

}

// ----------------------
// PRIZE LIST
// ----------------------

function renderPrizeList(){

if(!prizeList) return

prizeList.innerHTML=""

dropTable.forEach(item=>{

let row=document.createElement("div")
row.className="prize-row"

row.innerHTML=`
<div style="display:flex;align-items:center;gap:10px">
<img src="${item.img}" style="width:28px">
${item.name}
</div>
<div>${item.chance}%</div>
`

prizeList.appendChild(row)

})

}

// ----------------------
// SAVE INVENTORY
// ----------------------

function saveToInventory(item){

let inventory = JSON.parse(localStorage.getItem("inventory")) || []

inventory.push(item)

localStorage.setItem("inventory", JSON.stringify(inventory))

console.log("Добавлено в инвентарь:", item)

}

// ----------------------

renderPrizeList()
