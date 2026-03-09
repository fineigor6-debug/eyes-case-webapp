/* TELEGRAM MINI APP */

const tg = window.Telegram.WebApp
tg.expand()

/* ---------------------------
ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЯ
--------------------------- */

const user = tg.initDataUnsafe?.user

function initUser(){

if(!user) return

const usernameBlock = document.getElementById("username")
const avatarBlock = document.getElementById("avatar")

let name = user.username || user.first_name || "Player"

if(usernameBlock){
usernameBlock.innerText = name
}

if(user.username && avatarBlock){

avatarBlock.src =
"https://t.me/i/userpic/320/" + user.username + ".jpg"

}

}

initUser()

/* ---------------------------
НАВИГАЦИЯ
--------------------------- */

function openCases(){

buttonClick()

window.location.href = "cases.html"

}

function openVeolaCase(){

buttonClick()

window.location.href = "case.html"

}

function goBack(){

buttonClick()

window.history.back()

}

/* ---------------------------
АНИМАЦИЯ КНОПОК
--------------------------- */

function buttonClick(){

try{
tg.HapticFeedback.impactOccurred("light")
}catch(e){}

}

/* ---------------------------
РУЛЕТКА
--------------------------- */

let spinning = false

function spin(){

if(spinning) return

const track = document.getElementById("rouletteTrack")

if(!track) return

spinning = true

buttonClick()

/* сброс позиции */

track.style.transition = "none"
track.style.transform = "translateX(0px)"

setTimeout(() => {

let random = Math.floor(Math.random()*1800)+1800

track.style.transition =
"transform 5s cubic-bezier(.1,.7,.1,1)"

track.style.transform = "translateX(-"+random+"px)"

},50)

/* конец вращения */

setTimeout(()=>{

spinning = false

try{
tg.HapticFeedback.notificationOccurred("success")
}catch(e){}

},5200)

}

/* ---------------------------
ПЛАВНОЕ НАЖАТИЕ КНОПОК
--------------------------- */

document.addEventListener("click",(e)=>{

const btn = e.target.closest("button")

if(!btn) return

btn.style.transform = "scale(0.96)"

setTimeout(()=>{
btn.style.transform = "scale(1)"
},120)

})
