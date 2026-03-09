let tg = window.Telegram.WebApp

tg.expand()

/* ПОЛУЧАЕМ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ TELEGRAM */

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

/* КНОПКА НАЗАД */

function goBack(){

window.location.href = "index.html"

}

/* ОТКРЫТИЕ КЕЙСА ВЕОЛА */

function openVeolaCase(){

window.location.href = "case.html"

}

/* РУЛЕТКА КЕЙСА */

function spin(){

let track = document.getElementById("rouletteTrack")

if(!track) return

/* сброс позиции */

track.style.transition = "none"
track.style.transform = "translateX(0px)"

/* небольшая задержка */

setTimeout(() => {

let random = Math.floor(Math.random()*1500)+1500

track.style.transition = "transform 5s cubic-bezier(.1,.7,.1,1)"

track.style.transform = "translateX(-"+random+"px)"

},50)

}
