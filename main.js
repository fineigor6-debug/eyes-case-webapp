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

function openAchievements(){
window.location.href = "achievements.html"
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

loadInventory()

// ----------------------
// PROFILE STATS
// ----------------------

function loadProfileStats(){

const casesEl = document.getElementById("casesOpened")
const nftEl = document.getElementById("nftWon")

if(casesEl){
casesEl.innerText = getCasesOpened()
}

if(nftEl){
nftEl.innerText = getNFTCount()
}

}

loadProfileStats()

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

// LEVEL

function getLevel(xp){
return Math.floor(xp / 100) + 1
}

function getXPForNextLevel(level){
return level * 100
}

// UPDATE UI

function updateLevelUI(){

const xp = getXP()
const level = getLevel(xp)

const currentXP = xp - ((level-1)*100)

const fillPercent = (currentXP / 100) * 100

const levelEl = document.getElementById("playerLevel")
const fillEl = document.getElementById("xpFill")
const currentEl = document.getElementById("currentXP")
const nextEl = document.getElementById("nextXP")

if(levelEl) levelEl.innerText = level
if(fillEl) fillEl.style.width = fillPercent + "%"
if(currentEl) currentEl.innerText = currentXP
if(nextEl) nextEl.innerText = 100

}

updateLevelUI()

// ----------------------
// ACHIEVEMENTS SYSTEM
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

// CASE COUNT

function getCasesOpened(){
return parseInt(localStorage.getItem("casesOpened")) || 0
}

function addCaseOpened(){

let cases = getCasesOpened()

cases++

localStorage.setItem("casesOpened",cases)

checkAchievements()
loadProfileStats()

}

// NFT COUNT

function getNFTCount(){

let inventory = JSON.parse(localStorage.getItem("inventory")) || []

return inventory.filter(item=>!item.name.includes("Stars")).length

}

// UNLOCKED

function getUnlockedAchievements(){
return JSON.parse(localStorage.getItem("achievements")) || []
}

function unlockAchievement(id){

let unlocked = getUnlockedAchievements()

if(unlocked.includes(id)) return

unlocked.push(id)

localStorage.setItem("achievements",JSON.stringify(unlocked))

showAchievementPopup(id)

}

// CHECK

function checkAchievements(){

achievements.forEach(a=>{

if(a.condition()){
unlockAchievement(a.id)
}

})

}

// POPUP

function showAchievementPopup(id){

const ach = achievements.find(a=>a.id===id)

if(!ach) return

const popup = document.getElementById("achievementPopup")
const name = document.getElementById("achievementPopupName")

if(!popup || !name) return

name.innerText = ach.name

popup.classList.add("show")

setTimeout(()=>{

popup.classList.remove("show")

},3000)

}

// ----------------------
// RENDER ACHIEVEMENTS
// ----------------------

function renderAchievements(){

const list = document.getElementById("achievementsList")

if(!list) return

const unlocked = getUnlockedAchievements()

list.innerHTML=""

achievements.forEach(a=>{

const isUnlocked = unlocked.includes(a.id)

const div = document.createElement("div")

div.className = "achievement"

if(!isUnlocked){
div.classList.add("locked")
}

div.innerHTML = `
<div>
<div class="achievement-title">${a.name}</div>
<div class="achievement-desc">${a.desc}</div>
</div>

<div class="achievement-icon">
${isUnlocked ? "🏆" : "🔒"}
</div>
`

list.appendChild(div)

})

}

renderAchievements()
