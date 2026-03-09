// ----------------------
// ELEMENTS
// ----------------------

const track = document.getElementById("rouletteTrack")
const prizeList = document.getElementById("prizeList")
const openBtn = document.getElementById("openCaseBtn")

let spinning=false
let lastSpinTime=0

// ----------------------
// DROP TABLE (RTP 65%)
// ----------------------

const dropTable=[

{ name:"1 ⭐", chance:28 },
{ name:"2 ⭐", chance:22 },
{ name:"3 ⭐", chance:18 },
{ name:"5 ⭐", chance:14 },
{ name:"10 ⭐", chance:10 },
{ name:"25 ⭐", chance:6 },
{ name:"50 ⭐", chance:2 }

]

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
// SECURE RANDOM
// ----------------------

function secureRandom(){

const array = new Uint32Array(1)
crypto.getRandomValues(array)

return array[0] / (2**32)

}

// ----------------------
// RNG SALT
// ----------------------

let rngSalt = Date.now()

function secureRoll(){

rngSalt += Math.floor(secureRandom()*100000)

return (secureRandom() + (rngSalt % 1)) % 1

}

// ----------------------
// DROP ROLL
// ----------------------

function rollDrop(){

let rand=secureRoll()*100
let sum=0

for(let item of dropTable){

sum+=item.chance

if(rand<=sum){
return item
}

}

return dropTable[0]

}

// ----------------------
// BUILD ROULETTE
// ----------------------

function buildRoulette(winItem){

if(!track) return 0

track.innerHTML=""

let strip=[]

// длинная рулетка
for(let i=0;i<120;i++){

let r=Math.floor(secureRoll()*dropTable.length)
strip.push(dropTable[r].name)

}

// near miss
if(secureRoll()<0.35){

let rare=dropTable[dropTable.length-1].name
strip[110]=rare

}

// победитель
strip.push(winItem.name)

strip.forEach(name=>{

let div=document.createElement("div")
div.className="item"
div.innerText=name

track.appendChild(div)

})

return strip.length-1

}

// ----------------------
// SPIN CASE
// ----------------------

function spinCase(){

if(!track) return

// анти спам
const now=Date.now()

if(now-lastSpinTime<2000){
return
}

lastSpinTime=now

if(spinning) return
spinning=true

if(openBtn) openBtn.disabled=true

// выбираем дроп
let winItem=rollDrop()

// строим рулетку
let winPosition=buildRoulette(winItem)

track.style.transition="none"
track.style.transform="translateX(0px)"

setTimeout(()=>{

const item = track.querySelector(".item")
const itemWidth = item ? item.offsetWidth : 105

const centerOffset=(window.innerWidth/2)-(itemWidth/2)

const distance=(winPosition*itemWidth)-centerOffset

let spinTime=5200+(secureRoll()*1800)

track.style.transition=`transform ${spinTime}ms cubic-bezier(.05,.9,.15,1)`
track.style.transform=`translateX(-${distance}px)`

setTimeout(()=>{

alert("Вы выиграли: "+winItem.name)

spinning=false

if(openBtn) openBtn.disabled=false

},spinTime)

},60)

}

// ----------------------
// INIT
// ----------------------

renderPrizeList()
