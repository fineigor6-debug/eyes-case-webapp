const track = document.getElementById("rouletteTrack")
const prizeList = document.getElementById("prizeList")
const openBtn = document.getElementById("openCaseBtn")

let spinning=false

const dropTable=[

{ name:"1 ⭐", chance:28 },
{ name:"2 ⭐", chance:22 },
{ name:"3 ⭐", chance:18 },
{ name:"5 ⭐", chance:14 },
{ name:"10 ⭐", chance:10 },
{ name:"25 ⭐", chance:6 },
{ name:"50 ⭐", chance:2 }

]

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

function rollDrop(){

let rand=Math.random()*100
let sum=0

for(let item of dropTable){

sum+=item.chance

if(rand<=sum){
return item
}

}

return dropTable[0]

}

renderPrizeList()
