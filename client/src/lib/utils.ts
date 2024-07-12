import { Player } from "../types";

export const getRooms = async(channelID: string) => {
    try {
      const response = await fetch('/api/getRooms', {
        method: 'POST',
        body: JSON.stringify({
          channelID: channelID
        }),
        headers: {
          'Content-Type': 'application/json'
        },

      });

      console.log("response: ", response);

      const rooms = await response.json();
      return rooms;

    } catch (e) {
        console.error(e);
    }
  }

export function getDiscordAvatarUrl(userId: string, avatarId: string) {
    return `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.png`;
}

export const getOpponent = (players: Map<String, Player>, sessionId: string) => {
        const playerIds = Array.from(players.keys());
        console.log("playerIds", playerIds)
        
        if (playerIds.length !== 2) {
            // Handle cases where there are not exactly 2 players
            return null;
        }
        
        // Find the opponent's ID
        const opponentID = playerIds.find(id => id !== sessionId);
        console.log('opponentID', opponentID);
        
        console.log('opponent ', players.get(opponentID!));
        return opponentID ? players.get(opponentID) || null : null;
    
}





