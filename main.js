// TELEGRAM
const tg = window.Telegram.WebApp
tg.ready()

// USER DATA
const user = tg.initDataUnsafe?.user

if(user){

const username=document.getElementById("username")
const avatar=document.getElementById("avatar")

if(username){
username.innerText=user.first_name || "Player"
}

if(avatar && user.photo_url){
avatar.src=user.photo_url
}

}

// NAVIGATION

function openCases(){
window.location.href="cases.html"
}

function goBack(){
window.history.back()
}

function showPage(page){

document.querySelectorAll(".page").forEach(p=>{
p.classList.remove("active")
})

document.getElementById("page-"+page).classList.add("active")

document.querySelectorAll(".menu-item").forEach(i=>{
i.classList.remove("active")
})

event.currentTarget.classList.add("active")

}

function openCasePage(){

window.location.href="case.html"

}

function loadInventory(){

const grid = document.getElementById("inventoryGrid")

if(!grid){
return
}

let inventory = JSON.parse(localStorage.getItem("inventory")) || []

grid.innerHTML=""

if(inventory.length === 0){

grid.innerHTML="<p style='opacity:.6'>Инвентарь пуст</p>"
return

}

inventory.forEach(item=>{

let div=document.createElement("div")
div.className="item"

div.innerText=item

grid.appendChild(div)

})

}

loadInventory()
