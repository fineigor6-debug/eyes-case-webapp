const API = "https://late-term-2712.fineigor6.workers.dev"
const ADMIN_ID = 8528585798

let tg = window.Telegram.WebApp
let user = tg.initDataUnsafe.user

if(!user || user.id !== ADMIN_ID){
document.body.innerHTML="Access denied"
}

async function adminGiveStars(){

let id = document.getElementById("adminUserId").value
let stars = parseInt(document.getElementById("adminStars").value)

await fetch(API+"/api/add-balance",{

method:"POST",

headers:{"Content-Type":"application/json"},

body:JSON.stringify({
id:id,
amount:stars
})

})

alert("Баланс выдан")

}

async function adminRemoveStars(){

let id = document.getElementById("adminUserId").value
let stars = parseInt(document.getElementById("adminStars").value)

await fetch(API+"/api/add-balance",{

method:"POST",

headers:{"Content-Type":"application/json"},

body:JSON.stringify({
id:id,
amount:-stars
})

})

alert("Баланс снят")

}

window.adminGiveStars = adminGiveStars
window.adminRemoveStars = adminRemoveStars
