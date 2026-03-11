const API = "https://late-term-2712.fineigor6.workers.dev"
const ADMIN_ID = 8528585798

let tg = window.Telegram.WebApp
tg.ready()
tg.expand()

let user = tg.initDataUnsafe.user

if(!user){
user = {id:1, first_name:"Test"}
}

localStorage.setItem("playerId", user.id)

// USER UI

document.addEventListener("DOMContentLoaded",()=>{

const username = document.getElementById("username")
const avatar = document.getElementById("avatar")

if(username) username.innerText = user.first_name
if(avatar && user.photo_url) avatar.src = user.photo_url

loadPlayer()

})

// REGISTER PLAYER

async function register(){

await fetch(API+"/api/register",{

method:"POST",

headers:{"Content-Type":"application/json"},

body:JSON.stringify({
id:user.id,
name:user.first_name
})

})

}

// LOAD PLAYER

async function loadPlayer(){

const r = await fetch(API+"/api/player",{

method:"POST",

headers:{"Content-Type":"application/json"},

body:JSON.stringify({id:user.id})

})

const data = await r.json()

const balance = document.getElementById("balance")

if(balance) balance.innerText = data.balance

}

register()

// CASE OPEN

async function openCase(){

const r = await fetch(API+"/api/open-case",{

method:"POST",

headers:{"Content-Type":"application/json"},

body:JSON.stringify({id:user.id})

})

const data = await r.json()

alert("Выпало: "+data.item)

loadPlayer()

}

// NAVIGATION

function goHome(){window.location.href="index.html"}
function openCases(){window.location.href="cases.html"}
function openInventory(){window.location.href="inventory.html"}
function openProfile(){window.location.href="profile.html"}
function openAdmin(){window.location.href="admin.html"}

// EXPORT FUNCTIONS

window.openCase = openCase
window.goHome = goHome
window.openCases = openCases
window.openInventory = openInventory
window.openProfile = openProfile
window.openAdmin = openAdmin
