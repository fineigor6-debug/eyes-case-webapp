document.addEventListener("DOMContentLoaded", function () {

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

// ----------------------
// USER DATA
// ----------------------

if (user) {

    const username = document.getElementById("username")
    const avatar = document.getElementById("avatar")
    const profileAvatar = document.getElementById("profileAvatar")
    const profileName = document.getElementById("profileName")

    if (username) username.innerText = user.first_name || "Player"
    if (profileName) profileName.innerText = user.first_name || "Player"

    if (avatar && user.photo_url) avatar.src = user.photo_url
    if (profileAvatar && user.photo_url) profileAvatar.src = user.photo_url

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
// INVENTORY
// ----------------------

function loadInventory() {

    const grid = document.getElementById("inventoryGrid")
    if (!grid) return

    let inventory = JSON.parse(localStorage.getItem("inventory")) || []

    grid.innerHTML = ""

    if (inventory.length === 0) {

        grid.innerHTML = `
        <p style="opacity:.6;text-align:center">
        Инвентарь пуст
        </p>
        `
        return
    }

    inventory.forEach(item => {

        let div = document.createElement("div")
        div.className = "item"

        div.innerHTML = `
        <img src="${item.img}" style="width:70px;height:70px;object-fit:contain">
        <div style="font-size:12px;margin-top:6px">${item.name}</div>
        `

        grid.appendChild(div)

    })

}

if (document.getElementById("inventoryGrid")) loadInventory()

// ----------------------
// PROFILE STATS
// ----------------------

function loadProfileStats() {

    const casesEl = document.getElementById("casesOpened")
    const nftEl = document.getElementById("nftWon")

    if (casesEl) casesEl.innerText = getCasesOpened()
    if (nftEl) nftEl.innerText = getNFTCount()

}

loadProfileStats()
loadBestDrop()
loadTopItems()

// ----------------------
// XP SYSTEM
// ----------------------

function getXP() {
    return parseInt(localStorage.getItem("xp")) || 0
}

function addXP(amount) {

    let xp = getXP()
    xp += amount

    localStorage.setItem("xp", xp)

    updateLevelUI()

}

function getLevel(xp) {
    return Math.floor(xp / 100) + 1
}

function updateLevelUI() {

    const xp = getXP()
    const level = getLevel(xp)

    const currentXP = xp - ((level - 1) * 100)
    const fillPercent = Math.min((currentXP / 100) * 100, 100)

    const levelEl = document.getElementById("playerLevel")
    const fillEl = document.getElementById("xpFill")
    const currentEl = document.getElementById("currentXP")
    const nextEl = document.getElementById("nextXP")

    if (levelEl) levelEl.innerText = level
    if (fillEl) fillEl.style.width = fillPercent + "%"
    if (currentEl) currentEl.innerText = currentXP
    if (nextEl) nextEl.innerText = 100

}

updateLevelUI()

// ----------------------
// BALANCE SYSTEM
// ----------------------

function getBalance(){
return parseInt(localStorage.getItem("balance")) || 0
}

function addBalance(amount){

let balance = getBalance()
balance += amount

localStorage.setItem("balance", balance)

updateBalanceUI()

}

function spendBalance(amount){

let balance = getBalance()

if(balance < amount){
return false
}

balance -= amount
localStorage.setItem("balance", balance)

updateBalanceUI()

return true

}

function updateBalanceUI(){

const el = document.getElementById("balance")

if(!el) return

el.innerText = getBalance()

}

updateBalanceUI()

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
// TOP ITEMS SYSTEM
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
const rarity = getRarityValue(item.name)

let border = "#333"

if(rarity >= 6) border = "#FFD700"
else if(rarity >= 5) border = "#FF7A00"
else if(rarity >= 4) border = "#A335EE"
else if(rarity >= 3) border = "#3FA7FF"

slot.innerHTML = `
<div style="
display:flex;
flex-direction:column;
align-items:center;
gap:6px;
border:2px solid ${border};
border-radius:12px;
padding:6px;
">

<img src="${item.img}" style="width:50px;height:50px;object-fit:contain">

<div style="font-size:11px;text-align:center">
${item.name}
</div>

</div>
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

checkAchievements()
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
// BEST DROP SYSTEM
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
// ACHIEVEMENTS
// ----------------------

const achievements = [

{
id:"first_case",
name:"First Case",
desc:"Открой первый кейс",
condition:()=>getCasesOpened()>=1
},

{
id:"ten_cases",
name:"Case Hunter",
desc:"Открой 10 кейсов",
condition:()=>getCasesOpened()>=10
},

{
id:"fifty_cases",
name:"Case Master",
desc:"Открой 50 кейсов",
condition:()=>getCasesOpened()>=50
},

{
id:"first_nft",
name:"NFT Winner",
desc:"Выиграй NFT",
condition:()=>getNFTCount()>=1
}

]

// ----------------------
// ACHIEVEMENT STORAGE
// ----------------------

function getUnlockedAchievements(){
return JSON.parse(localStorage.getItem("achievements"))||[]
}

function unlockAchievement(id){

let unlocked=getUnlockedAchievements()

if(unlocked.includes(id)) return

unlocked.push(id)

localStorage.setItem("achievements",JSON.stringify(unlocked))

showAchievementPopup(id)

}

// ----------------------
// CHECK ACHIEVEMENTS
// ----------------------

function checkAchievements(){

achievements.forEach(a=>{
if(a.condition()){
unlockAchievement(a.id)
}
})

}

// ----------------------
// ACHIEVEMENT POPUP
// ----------------------

function showAchievementPopup(id){

const ach=achievements.find(a=>a.id===id)
if(!ach) return

const popup=document.getElementById("achievementPopup")
const name=document.getElementById("achievementPopupName")

if(!popup||!name) return

name.innerText=ach.name

popup.classList.add("show")

setTimeout(()=>{
popup.classList.remove("show")
},3000)

}

// ----------------------
// RENDER ACHIEVEMENTS
// ----------------------

function renderAchievements(){

const list=document.getElementById("achievementsList")
if(!list) return

const unlocked=getUnlockedAchievements()

list.innerHTML=""

achievements.forEach(a=>{

const isUnlocked=unlocked.includes(a.id)

const div=document.createElement("div")
div.className="achievement"

if(!isUnlocked){
div.classList.add("locked")
}

div.innerHTML=`
<div>
<div class="achievement-title">${a.name}</div>
<div class="achievement-desc">${a.desc}</div>
</div>

<div class="achievement-icon">
${isUnlocked?"🏆":"🔒"}
</div>
`

list.appendChild(div)

})

}

if(document.getElementById("achievementsList")){
renderAchievements()
}

// ----------------------
// EXPORT FUNCTIONS
// ----------------------

window.addCaseOpened = addCaseOpened
window.addXP = addXP
window.getCasesOpened = getCasesOpened
window.getNFTCount = getNFTCount
window.updateBestDrop = updateBestDrop
window.loadBestDrop = loadBestDrop
window.loadTopItems = loadTopItems

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
