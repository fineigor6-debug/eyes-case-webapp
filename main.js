// ----------------------
// TELEGRAM INIT
// ----------------------

const tg = window.Telegram?.WebApp

if(tg){
tg.ready()
tg.expand()
}

// ----------------------
// USER DATA
// ----------------------

const user = tg?.initDataUnsafe?.user

if(user){

const username = document.getElementById("username")
const avatar = document.getElementById("avatar")
const profileName = document.getElementById("profileName")

if(username){
username.innerText = user.first_name || "Player"
}

if(profileName){
profileName.innerText = user.first_name || "Player"
}

if(avatar && user.photo_url){
avatar.src = user.photo_url
}

}

// ----------------------
// NAVIGATION
// ----------------------

function goHome(){
window.location.href = "index.html"
}

function openCases(){
window.location.href = "cases.html"
}

function openCasePage(){
window.location.href = "case.html"
}

function openInventory(){
window.location.href = "inventory.html"
}

function openProfile(){
window.location.href = "profile.html"
}

function goBack(){
window.history.back()
}

// ----------------------
// INVENTORY
// ----------------------

function loadInventory(){

const grid = document.getElementById("inventoryGrid")

if(!grid) return

let inventory = JSON.parse(localStorage.getItem("inventory")) || []

grid.innerHTML = ""

if(inventory.length === 0){

grid.innerHTML = `
<p style="opacity:.6;text-align:center">
Инвентарь пуст
</p>
`

return
}

inventory.forEach(item=>{

let div = document.createElement("div")
div.className = "item"

div.innerHTML = `
<img src="${item.img}" style="width:70px;height:70px;object-fit:contain">
<div style="font-size:12px;margin-top:6px">${item.name}</div>
`

grid.appendChild(div)

})

}

// запуск
loadInventory()
