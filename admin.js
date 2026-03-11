// ----------------------
// CONFIG
// ----------------------

const API = "https://bold-dew-c931.fineigor6.workers.dev"
const ADMIN_ID = 8528585798
const ADMIN_KEY = "pulvglazanavasnassal"

// ----------------------
// TELEGRAM USER
// ----------------------

let user = null

if (window.Telegram && window.Telegram.WebApp) {

const tg = window.Telegram.WebApp
tg.ready()

if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
user = tg.initDataUnsafe.user
}

}

// ----------------------
// ADMIN CHECK
// ----------------------

if(!user || user.id !== ADMIN_ID){

document.body.innerHTML = `
<h2 style="text-align:center;margin-top:50px">
Access denied
</h2>
`

throw new Error("Not admin")

}

// ----------------------
// GIVE BALANCE
// ----------------------

function adminGiveStars(){

let id = document.getElementById("adminUserId").value
let stars = parseInt(document.getElementById("adminStars").value)

fetch(API + "/add-balance",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
id:id,
amount:stars,
key:ADMIN_KEY
})

})

.then(res=>res.json())
.then(data=>{

alert("Баланс выдан")

})
.catch(()=>{

alert("Ошибка сервера")

})

}

// ----------------------
// REMOVE BALANCE
// ----------------------

function adminRemoveStars(){

let id = document.getElementById("adminUserId").value
let stars = parseInt(document.getElementById("adminStars").value)

fetch(API + "/add-balance",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
id:id,
amount:-stars,
key:ADMIN_KEY
})

})

.then(res=>res.json())
.then(data=>{

alert("Баланс снят")

})
.catch(()=>{

alert("Ошибка сервера")

})

}
