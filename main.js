const ADMIN_ID = 8528585798

// ----------------------
// TELEGRAM INIT
// ----------------------

let tg = null
let user = null

if (window.Telegram && window.Telegram.WebApp) {

tg = window.Telegram.WebApp
tg.ready()
tg.expand()

if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
user = tg.initDataUnsafe.user
}

}

// fallback если не Telegram
if(!user){

user = {
id: localStorage.getItem("playerId") || 999999,
first_name:"Player"
}

}

localStorage.setItem("playerId", user.id)

// ----------------------
// REGISTER PLAYER
// ----------------------

if(user){

fetch(API + "/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
id:user.id,
name:user.first_name
})

})

}

// ----------------------
// LOAD BALANCE
// ----------------------

function loadBalance(){

if(!user) return

fetch(API + "/player",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
id:user.id
})

})

.then(res=>res.json())
.then(data=>{

const el = document.getElementById("balance")

if(el){
el.innerText = data.balance
}

})

}

// ----------------------
// USER DATA
// ----------------------

function loadUserData(){

if (!user) return

const username = document.getElementById("username")
const avatar = document.getElementById("avatar")
const profileAvatar = document.getElementById("profileAvatar")
const profileName = document.getElementById("profileName")
const playerId = document.getElementById("playerId")

if (username) username.innerText = user.first_name || "Player"
if (profileName) profileName.innerText = user.first_name || "Player"

if (avatar && user.photo_url) avatar.src = user.photo_url
if (profileAvatar && user.photo_url) profileAvatar.src = user.photo_url

if(playerId){
playerId.innerText = user.id
}

}

// ----------------------
// ADMIN BUTTON
// ----------------------

function initAdmin(){

if(user && user.id == ADMIN_ID){

const adminBtn = document.getElementById("adminPanelBtn")

if(adminBtn){
adminBtn.style.display = "block"
}

}

}

// ----------------------
// NFT SELL PRICES
// ----------------------

const sellPrices = {

"Magic Potion":1000,
"Ion Gem":5000,
"Mini Oscar":6000,
"Heroic Helmet":12000,
"Precious Peach":14000,
"Durov's Cap":24000

}

// ----------------------
// BUY CASE
// ----------------------

function buyCase(){

window.location.href = "case.html"

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

inventory.forEach((item,index)=>{

let div = document.createElement("div")
div.className = "item"

let sellButton = ""

if(!item.name.includes("Stars")){

const price = sellPrices[item.name] || 0

sellButton = `
<button class="sell-btn" onclick="sellItem(${index})">
Продать ⭐${price}
</button>
`

}

div.innerHTML = `
<img src="${item.img}" style="width:70px;height:70px;object-fit:contain">

<div style="font-size:12px;margin-top:6px">
${item.name}
</div>

${sellButton}
`

grid.appendChild(div)

})

}

// ----------------------
// SELL ITEM
// ----------------------

async function sellItem(index){

const id = localStorage.getItem("playerId")

const res = await fetch(API + "/sell-item",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
id:id,
index:index
})

})

await res.json()

alert("Предмет продан")

loadBalance()

}

// ----------------------
// PROFILE STATS
// ----------------------

function loadProfileStats(){

const casesEl = document.getElementById("casesOpened")
const nftEl = document.getElementById("nftWon")

if(casesEl) casesEl.innerText = getCasesOpened()
if(nftEl) nftEl.innerText = getNFTCount()

}

// ----------------------
// XP SYSTEM
// ----------------------

function getXP(){
return parseInt(localStorage.getItem("xp")) || 0
}

function addXP(amount){

let xp = getXP()
xp += amount

localStorage.setItem("xp", xp)

updateLevelUI()

}

function getLevel(xp){
return Math.floor(xp / 100) + 1
}

function updateLevelUI(){

const xp = getXP()
const level = getLevel(xp)

const currentXP = xp - ((level - 1) * 100)
const fillPercent = Math.min((currentXP / 100) * 100, 100)

const levelEl = document.getElementById("playerLevel")
const fillEl = document.getElementById("xpFill")
const currentEl = document.getElementById("currentXP")
const nextEl = document.getElementById("nextXP")

if(levelEl) levelEl.innerText = level
if(fillEl) fillEl.style.width = fillPercent + "%"
if(currentEl) currentEl.innerText = currentXP
if(nextEl) nextEl.innerText = 100

}

// ----------------------
// RARITY SYSTEM
// ----------------------

function getRarityValue(name){

if(name === "Durov's Cap") return 6
if(name === "Precious Peach") return 5
if(name === "Heroic Helmet") return 4
if(name === "Mini Oscar") return 3
if(name === "Ion Gem") return 2
if(name === "Magic Potion") return 1

return 0

}

// ----------------------
// TOP ITEMS
// ----------------------

function loadTopItems(){

const slots = document.querySelectorAll(".top-item")
if(!slots.length) return

let inventory = JSON.parse(localStorage.getItem("inventory")) || []

inventory = inventory.filter(i => !i.name.includes("Stars"))

inventory.sort((a,b)=>getRarityValue(b.name)-getRarityValue(a.name))

const top = inventory.slice(0,3)

slots.forEach((slot,i)=>{

slot.innerHTML = ""

if(!top[i]){
slot.innerHTML = `<div style="opacity:.3">—</div>`
return
}

const item = top[i]

slot.innerHTML = `
<img src="${item.img}" style="width:50px">
<div style="font-size:11px">${item.name}</div>
`

})

}

// ----------------------
// CASE COUNT
// ----------------------

function getCasesOpened(){
return parseInt(localStorage.getItem("casesOpened"))||0
}

function addCaseOpened(){

let cases=getCasesOpened()
cases++

localStorage.setItem("casesOpened",cases)

addXP(10)

loadProfileStats()
loadTopItems()

}

// ----------------------
// NFT COUNT
// ----------------------

function getNFTCount(){

let inventory=JSON.parse(localStorage.getItem("inventory"))||[]

return inventory.filter(item=>!item.name.includes("Stars")).length

}

// ----------------------
// BEST DROP
// ----------------------

function getBestDrop(){
return JSON.parse(localStorage.getItem("bestDrop")) || null
}

function updateBestDrop(item){

if(item.name.includes("Stars")) return

let best = getBestDrop()

if(!best){
localStorage.setItem("bestDrop", JSON.stringify(item))
return
}

const rarity = getRarityValue(item.name)
const bestRarity = getRarityValue(best.name)

if(rarity > bestRarity){
localStorage.setItem("bestDrop", JSON.stringify(item))
}

loadBestDrop()
loadTopItems()

}

function loadBestDrop(){

const el = document.getElementById("bestDrop")
if(!el) return

let best = getBestDrop()

if(!best){
el.innerText = "Нет"
return
}

el.innerHTML = `
<img src="${best.img}" style="width:32px;margin-right:8px">
${best.name}
`

}

// ----------------------
// INIT
// ----------------------

document.addEventListener("DOMContentLoaded", function () {

loadBalance()
loadUserData()
initAdmin()
loadInventory()
loadProfileStats()
loadBestDrop()
loadTopItems()
updateLevelUI()

})

// ----------------------
// NAVIGATION
// ----------------------

function goHome(){window.location.href="index.html"}
function openCases(){window.location.href="cases.html"}
function openCasePage(){window.location.href="case.html"}
function openInventory(){window.location.href="inventory.html"}
function openProfile(){window.location.href="profile.html"}
function openAchievements(){window.location.href="achievements.html"}
function goBack(){window.history.back()}
function openAdmin(){window.location.href="admin.html"}
