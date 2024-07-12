import express from 'express';
import dotenv from 'dotenv';
import {createServer} from 'http'
import {Server, matchMaker} from '@colyseus/core';
import {monitor} from '@colyseus/monitor';
import {WebSocketTransport} from '@colyseus/ws-transport';
import {RPSRoom} from './rooms/RPSRoom';
dotenv.config({ path: "../.env" });

const app = express();
const router = express.Router();
const port = 3001;

const server = new Server({
    transport: new WebSocketTransport({
        server: createServer(app),
    }),
});

server.define('RPSRoom', RPSRoom)



app.use('/colyseus', monitor());

//parse JSON
app.use(express.json());


//discord auth stuff
router.post("/token", async(req, res) => {

    console.log('hello!');

    const response = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: process.env.VITE_DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: req.body.code,
        } as any)
    });

    const { access_token } = await response.json();

    res.send({access_token});

    console.log('sent access token')
});


router.post("/getRooms", async(req, res) => {
    const q = await matchMaker.query({name: "RPSRoom"});

    let rooms = q.filter((room) => room.metadata.channelID === req.body.channelID);
    if(rooms.length < 3){
        for(let i = 0; i <= 2; i++){
            let roomCode = ""
            i == 0? roomCode = "A" : i == 1? roomCode = "B" : roomCode = "C";
            matchMaker.createRoom("RPSRoom", {
                channelID: req.body.channelID,
                roomCode: roomCode,
            });
        }
    }
    rooms = q.filter((room) => room.metadata.channelID === req.body.channelID);

    console.log(rooms);

    res.json(rooms);
});

app.use('/', router);

server.listen(port).then(() => {
    console.log(`Server is running on port ${port}`)
});



