let tg = window.Telegram.WebApp

tg.expand()

let user = tg.initDataUnsafe.user

if(user){

let name = user.username || user.first_name

document.getElementById("username").innerText = name

if(user.username){

document.getElementById("avatar").src =
"https://t.me/i/userpic/320/" + user.username + ".jpg"

}

}

function openCase(){

alert("Кейс открывается 🎰")

}
