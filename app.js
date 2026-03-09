let tg = window.Telegram.WebApp

tg.expand()

/* ПОЛУЧЕНИЕ ДАННЫХ TELEGRAM */

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

/* ПЕРЕХОД НА ЭКРАН КЕЙСОВ */

function openCases(){

window.location.href = "cases.html"

}

/* НАЗАД */

function goBack(){

window.location.href = "index.html"

}

/* ОТКРЫТИЕ КЕЙСА ВЕОЛА */

function openVeolaCase(){

window.location.href = "case.html"

}

/* КРУТИТЬ РУЛЕТКУ */

function spin(){

let track = document.getElementById("rouletteTrack")

if(!track) return

let random = Math.floor(Math.random()*800)+800

track.style.transform = "translateX(-"+random+"px)"

}
