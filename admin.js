const API = "https://bold-dew-c931.fineigor6.workers.dev"
const ADMIN_KEY = "peel"

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

if(data.error){
alert(data.error)
}else{
alert("Баланс выдан")
}

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

if(data.error){
alert(data.error)
}else{
alert("Баланс снят")
}

})

}
