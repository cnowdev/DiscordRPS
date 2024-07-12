import { Schema, MapSchema, type } from "@colyseus/schema";    

export class Player extends Schema {
    @type("string") name: string;
    @type("string") pfp: string | null = null;
    @type("string") move: string | null = null;
}

export class RPSRoomState extends Schema {
    @type({ map: Player }) players = new MapSchema<Player>();
    @type("string") channelID: string;
    @type("string") roomCode: string;


}