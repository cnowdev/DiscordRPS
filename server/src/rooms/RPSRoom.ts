import {Room, Client, matchMaker } from 'colyseus';
import { RPSRoomState, Player } from './RPSRoomState';
import { determineWinner, haveBothPlayersMoved } from '../lib/utils';


export class RPSRoom extends Room {
    maxClients: number = 2;
    /* @ts-ignore */
    autoDispose: boolean = false;
    
    


    onCreate(options: any) {

        const state = new RPSRoomState();
        state.channelID = options.channelID;
        state.roomCode = options.roomCode;

        this.setState(state);
        this.setMetadata({
            channelID: options.channelID,
            roomCode: options.roomCode,
            players: []
        });

        this.onMessage("move", (client: Client, message) => {

            const player = this.state.players.get(client.sessionId);
           player.move = message.move;

            if(player) {
                this.state.players.set(client.sessionId, player);
            }

            console.log(haveBothPlayersMoved(this.state.players));
            
            if(haveBothPlayersMoved(this.state.players)){
                const winner = determineWinner(this.state.players);
                this.broadcast('result', {
                    winner: winner
                })
            }
        });


    }


    onJoin(client: Client, options: any) {
        console.log('someone joined the game!', options);
        const player = new Player();

        player.name = options.name;
        player.pfp = options.pfp;

        this.state.players.set(client.sessionId, player);
        
        //fetch current metadata, modify it to include the new player 
        const currentMetadata = this.metadata;
        currentMetadata.players.push({
            id: client.sessionId,
            name: options.name,
            pfp: options.pfp,
        });
        
        this.setMetadata(currentMetadata);
    }

    onLeave(client: Client, consented: boolean) {
        console.log('someone left the game.');

        if (this.state.players.has(client.sessionId)) {
            this.state.players.delete(client.sessionId);
        }
        
        //fetch current metadata, modify it to remove this player
        const currentMetadata = this.metadata;
        const updatedPlayers = currentMetadata.players.filter((player: any) => player.id !== client.sessionId);
        currentMetadata.players = updatedPlayers;

        this.setMetadata(currentMetadata);
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}

