const API = "https://bold-dew-c931.fineigor6.workers.dev"
const ADMIN_KEY = "pulvglazanavasnassal"

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
.then(()=>{
alert("Баланс выдан")
})

}

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
.then(()=>{
alert("Баланс снят")
})

}

if(user.id !== 8528585798){
document.body.innerHTML="Access denied"
}
