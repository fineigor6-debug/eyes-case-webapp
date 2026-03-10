// ----------------------
// ELEMENTS
// ----------------------

const track = document.getElementById("rouletteTrack")
const prizeList = document.getElementById("prizeList")
const openBtn = document.getElementById("openCaseBtn")

let spinning=false

// ----------------------
// DROP ECONOMY
// ----------------------

const dropTable=[

{ name:"1 ⭐", chance:30 },
{ name:"2 ⭐", chance:22 },
{ name:"3 ⭐", chance:18 },
{ name:"5 ⭐", chance:14 },
{ name:"10 ⭐", chance:9 },
{ name:"25 ⭐", chance:5 },
{ name:"50 ⭐", chance:2 }

]

// ----------------------
// RANDOM
// ----------------------

function random(){

const arr=new Uint32Array(1)
crypto.getRandomValues(arr)

return arr[0]/4294967296

}

// ----------------------
// ROLL DROP
// ----------------------

function rollDrop(){

let r=random()*100
let sum=0

for(let item of dropTable){

sum+=item.chance

if(r<=sum){
return item
}

}

return dropTable[0]

}

// ----------------------
// BUILD ROULETTE
// ----------------------

function buildRoulette(winItem){

track.innerHTML=""

let strip=[]

// случайная часть
for(let i=0;i<70;i++){

let r=Math.floor(random()*dropTable.length)
strip.push(dropTable[r].name)

}

// near miss
if(random()<0.45){

let rare=dropTable[dropTable.length-1].name
strip.push(rare)

}

// победитель
strip.push(winItem.name)

// ещё немного после
for(let i=0;i<20;i++){

let r=Math.floor(random()*dropTable.length)
strip.push(dropTable[r].name)

}

// DOM
strip.forEach(name=>{

let div=document.createElement("div")
div.className="item"
div.innerText=name

track.appendChild(div)

})

// позиция победителя
return strip.indexOf(winItem.name)

}

// ----------------------
// SPIN CASE
// ----------------------

function spinCase(){

if(spinning) return
spinning=true

if(openBtn) openBtn.disabled=true

// выбираем дроп
const winItem=rollDrop()

// строим рулетку
const winPos=buildRoulette(winItem)

// reset
track.style.transition="none"
track.style.transform="translateX(0px)"

setTimeout(()=>{

const item=track.querySelector(".item")
const itemWidth=item ? item.offsetWidth : 105

const centerOffset=(window.innerWidth/2)-(itemWidth/2)

const distance=(winPos*itemWidth)-centerOffset

// slow motion
const spinTime=6000+random()*2000

track.style.transition=`transform ${spinTime}ms cubic-bezier(.08,.85,.15,1)`
track.style.transform=`translateX(-${distance}px)`

setTimeout(()=>{

alert("Вы выиграли: "+winItem.name)

spinning=false
if(openBtn) openBtn.disabled=false

},spinTime)

},60)

}
