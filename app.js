let tg = window.Telegram.WebApp

tg.expand()

/* ПОЛУЧАЕМ ПОЛЬЗОВАТЕЛЯ TELEGRAM */

let user = tg.initDataUnsafe.user

if(user){

let name = user.username || user.first_name

let usernameBlock = document.getElementById("username")
let avatarBlock = document.getElementById("avatar")

if(usernameBlock){
usernameBlock.innerText = name
}

if(user.username && avatarBlock){

avatarBlock.src =
"https://t.me/i/userpic/320/" + user.username + ".jpg"

}

}

/* ОТКРЫТЬ ЭКРАН С КЕЙСАМИ */

function openCases(){

window.location.href = "cases.html"

}

/* НАЗАД */

function goBack(){

window.location.href = "index.html"

}

/* ОТКРЫТИЕ КЕЙСА */

function openCase(){

alert("Кейс открывается 🎰")

}
