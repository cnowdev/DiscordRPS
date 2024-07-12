import { DiscordSDK, CommandResponseTypes } from '@discord/embedded-app-sdk';
import { Room } from 'colyseus.js';

export interface DiscordContextType {
    discordSdk: DiscordSDK;
    auth: CommandResponseTypes['authenticate'] | null;
}

export interface RoomContextType {
    room: Room | null,
    setRoom: React.Dispatch<React.SetStateAction<Room<any> | null>>;
}

export interface Player {
    name: string;
    pfp: string | null;
    move: string | null;
}