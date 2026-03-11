const express = require("express")
const fs = require("fs")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const DB = "players.json"

// ----------------------
// LOAD PLAYERS
// ----------------------

function loadPlayers(){
return JSON.parse(fs.readFileSync(DB))
}

function savePlayers(players){
fs.writeFileSync(DB, JSON.stringify(players,null,2))
}

// ----------------------
// REGISTER PLAYER
// ----------------------

app.post("/register",(req,res)=>{

const {id,name} = req.body

let players = loadPlayers()

let player = players.find(p=>p.id==id)

if(!player){

players.push({
id,
name,
balance:0,
inventory:[]
})

savePlayers(players)

}

res.json({status:"ok"})

})

// ----------------------
// GET PLAYER
// ----------------------

app.get("/player/:id",(req,res)=>{

let players = loadPlayers()

let player = players.find(p=>p.id == req.params.id)

res.json(player)

})

// ----------------------
// ADD BALANCE
// ----------------------

app.post("/addBalance",(req,res)=>{

const {id,amount} = req.body

let players = loadPlayers()

let player = players.find(p=>p.id == id)

if(player){

player.balance += amount

savePlayers(players)

}

res.json(player)

})

// ----------------------
// REMOVE BALANCE
// ----------------------

app.post("/removeBalance",(req,res)=>{

const {id,amount} = req.body

let players = loadPlayers()

let player = players.find(p=>p.id == id)

if(player){

player.balance -= amount

if(player.balance < 0) player.balance = 0

savePlayers(players)

}

res.json(player)

})

app.listen(3000,()=>{
console.log("Server running")
})
