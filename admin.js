const API = "https://bold-dew-c931.fineigor6.workers.dev"
const ADMIN_KEY = "superSecretAdminKey"

document.addEventListener("DOMContentLoaded", () => {

const giveBtn = document.querySelector(".btn-give")
const removeBtn = document.querySelector(".btn-remove")

if(giveBtn){
giveBtn.addEventListener("click", adminGiveStars)
}

if(removeBtn){
removeBtn.addEventListener("click", adminRemoveStars)
}

})

function adminGiveStars(){

const id = document.getElementById("adminUserId").value
const stars = parseInt(document.getElementById("adminStars").value)

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

}

function adminRemoveStars(){

const id = document.getElementById("adminUserId").value
const stars = parseInt(document.getElementById("adminStars").value)

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

}
