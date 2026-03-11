const API = "https://bold-dew-c931.fineigor6.workers.dev"
const ADMIN_KEY = "8528585798"

// ----------------------
// REGISTER PLAYER
// ----------------------

async function apiRegister(id,name){

return fetch(API + "/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
id:id,
name:name
})

})

}

// ----------------------
// GET PLAYER
// ----------------------

async function apiGetPlayer(id){

const res = await fetch(API + "/player",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
id:id
})

})

return res.json()

}

// ----------------------
// OPEN CASE
// ----------------------

async function apiOpenCase(id){

const res = await fetch(API + "/open-case",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
id:id
})

})

return res.json()

}

// ----------------------
// ADMIN ADD BALANCE
// ----------------------

async function apiAddBalance(id,amount){

const res = await fetch(API + "/add-balance",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
id:id,
amount:amount,
key:ADMIN_KEY
})

})

return res.json()

}
