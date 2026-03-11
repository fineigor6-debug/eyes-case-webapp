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

let dropTable = [

{
name:"Magic Potion",
img:"IMG_0667.jpeg",
link:"https://t.me/nft/MagicPotion-4099",
chance:30
},

{
name:"Ion Gem",
img:"IMG_0668.webp",
link:"https://t.me/nft/IonGem-2149",
chance:22
},

{
name:"Mini Oscar",
img:"IMG_0669.webp",
link:"https://t.me/nft/MiniOscar-3627",
chance:18
},

{
name:"Heroic Helmet",
img:"IMG_0670.jpeg",
link:"https://t.me/nft/HeroicHelmet-1880",
chance:14
},

{
name:"Precious Peach",
img:"IMG_0671.webp",
link:"https://t.me/nft/PreciousPeach-527",
chance:10
},

{
name:"Durov's Cap",
img:"IMG_0672.webp",
link:"https://t.me/nft/DurovsCap-4110",
chance:6
}

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

for(let item of dropTable){

sum += item.chance

if(r <= sum){
return item
}

}

return dropTable[0]

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

div.innerHTML=`
<a href="${item.link}" target="_blank">
<img src="${item.img}">
</a>
`

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

setTimeout(()=>{

const item = track.querySelector(".item")

const itemWidth = item.offsetWidth
const gap = parseInt(getComputedStyle(track).gap) || 0
const step = itemWidth + gap

const roulette = document.querySelector(".roulette")
const center = roulette.offsetWidth/2 - itemWidth/2

const targetIndex = 80

const distance = targetIndex * step - center

const spinTime = 6000 + random()*2000

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

winItem.innerHTML=`
<img src="${item.img}" style="width:90px;margin-bottom:10px"><br>
${item.name}
`

saveToInventory(item)

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
