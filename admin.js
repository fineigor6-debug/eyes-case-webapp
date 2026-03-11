function adminGiveStars(){

let id = document.getElementById("adminUserId").value
let stars = parseInt(document.getElementById("adminStars").value)

fetch("http://localhost:3000/addBalance",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
id:id,
amount:stars
})

})
.then(res=>res.json())
.then(()=>{
alert("Баланс выдан")
})

}
