const API = "https://bold-dew-c931.fineigor6.workers.dev"

// регистрация игрока
function registerPlayer(user){

fetch(API + "/register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
id:user.id,
name:user.first_name
})
})

}

// получить баланс
function getServerBalance(userId){

return fetch(API + "/balance",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
id:userId
})
})
.then(res=>res.json())

}

// админ добавить баланс
function addServerBalance(userId, amount){

return fetch(API + "/add-balance",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
id:userId,
amount:amount
})
})
.then(res=>res.json())

}
