export default {

async fetch(request, env) {

const url = new URL(request.url)


// REGISTER PLAYER
if (url.pathname === "/register" && request.method === "POST") {

const data = await request.json()

const player = {
id: data.id,
name: data.name,
balance: 0
}

await env.PLAYERS.put(data.id, JSON.stringify(player))

return new Response(JSON.stringify({status:"registered"}), {
headers:{ "Content-Type":"application/json" }
})

}


// GET PLAYER
if (url.pathname === "/player") {

const id = url.searchParams.get("id")

const player = await env.PLAYERS.get(id)

return new Response(player,{
headers:{ "Content-Type":"application/json" }
})

}


// ADD BALANCE
if (url.pathname === "/addBalance" && request.method === "POST") {

const data = await request.json()

let player = await env.PLAYERS.get(data.id)

player = JSON.parse(player)

player.balance += data.amount

await env.PLAYERS.put(data.id, JSON.stringify(player))

return new Response(JSON.stringify({
status:"ok",
balance:player.balance
}),{
headers:{ "Content-Type":"application/json" }
})

}

return fetch(request)

}

}
