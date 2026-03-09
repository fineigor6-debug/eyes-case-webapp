let tg = window.Telegram.WebApp

tg.expand()

let user = tg.initDataUnsafe.user

if(user){

let name = user.username || user.first_name

document.getElementById("username").innerText = name

if(user.username){

let avatarUrl = "https://t.me/i/userpic/320/" + user.username + ".jpg"

document.getElementById("avatar").src = avatarUrl

}

}

function openCase(){

let items = [

"⚪ мегарекий Eye",
"🟢 редкий Eye",
"🔵 пися",
"👁 жопа член",
"💎 пнуть веола"

]

let random = Math.floor(Math.random()*items.length)

let win = items[random]

document.getElementById("result").innerText =
"Вы выиграли: " + win

}
