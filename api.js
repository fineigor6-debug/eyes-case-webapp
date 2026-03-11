const API = "https://bold-dew-c931.fineigor6.workers.dev"
const ADMIN_KEY = "superSecretAdminKey"

// регистрация игрока
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

// получить игрока
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

// открыть кейс
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

// продать предмет
async function apiSellItem(id,index){

const res = await fetch(API + "/sell-item",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
id:id,
index:index
})

})

return res.json()

}

// админ баланс
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
