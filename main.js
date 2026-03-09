// TELEGRAM
const tg = window.Telegram.WebApp
tg.ready()

// USER DATA
const user = tg.initDataUnsafe?.user

if(user){

const username=document.getElementById("username")
const avatar=document.getElementById("avatar")

if(username){
username.innerText=user.first_name || "Player"
}

if(avatar && user.photo_url){
avatar.src=user.photo_url
}

}

// NAVIGATION

function openCases(){
window.location.href="cases.html"
}

function goBack(){
window.history.back()
}
