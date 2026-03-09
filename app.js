const items = [
{ name:"💎 кейс от #пыльвглаза", chance:1, color:"#ff00ff" },
{ name:"👁 кейс веола", chance:4, color:"#ff9900" },
{ name:"🔵 кейс окуп меллгифтс", chance:10, color:"#a335ee" },
{ name:"🟢 кейс бича", chance:25, color:"#0070dd" },
{ name:"⚪ Обычный кейс", chance:60, color:"#aaaaaa" }
]

function openCase(){

const result = document.getElementById("result")

result.innerText="Opening..."
result.classList.add("spin")

setTimeout(()=>{

result.classList.remove("spin")

let random = Math.random()*100
let current=0
let win=null

for(let item of items){
current+=item.chance
if(random<=current){
win=item
break
}
}

result.innerText=win.name
result.style.color=win.color

},2000)

}
