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
img:"https://nft.fragment.com/gift/magic_potion.png",
link:"https://t.me/nft/MagicPotion-4099",
chance:30
},

{
name:"Ion Gem",
img:"https://nft.fragment.com/gift/ion_gem.png",
link:"https://t.me/nft/IonGem-2149",
chance:22
},

{
name:"Mini Oscar",
img:"https://nft.fragment.com/gift/mini_oscar.png",
link:"https://t.me/nft/MiniOscar-3627",
chance:18
},

{
name:"Heroic Helmet",
img:"https://nft.fragment.com/gift/heroic_helmet.png",
link:"https://t.me/nft/HeroicHelmet-1880",
chance:14
},

{
name:"Precious Peach",
img:"https://nft.fragment.com/gift/precious_peach.png",
link:"https://t.me/nft/PreciousPeach-527",
chance:9
},

{
name:"Durov's Cap",
img:"https://nft.fragment.com/gift/durovs_cap.png",
link:"https://t.me/nft/DurovsCap-4110",
chance:5
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

track.style.transition="none"
track.style.transform="translateX(0)"

setTimeout(()=>{

const item = track.querySelector(".item")
const itemWidth = item.offsetWidth
const gap = parseInt(getComputedStyle(track).gap) || 0
const step = itemWidth + gap

const roulette = document.querySelector(".roulette")
const center = roulette.offsetWidth/2 - itemWidth/2

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

winItem.innerHTML=`
<img src="${item.img}" style="width:80px"><br>
${item.name}
`

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
<div style="display:flex;gap:10px;align-items:center">
<img src="${item.img}" width="24">
${item.name}
</div>
<div>${item.chance}%</div>
`

prizeList.appendChild(row)

})

}

// ----------------------

renderPrizeList()
