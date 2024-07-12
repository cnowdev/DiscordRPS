import { MapSchema } from '@colyseus/schema';
import { Player } from '../rooms/RPSRoomState';


export const haveBothPlayersMoved = (players: MapSchema<Player>): boolean => {
    const playerList = Array.from(players.values());
    

    if (playerList.length !== 2) {
      return false;
    }

    return playerList.every(player => player.move !== null);
  }
  
export const determineWinner = (players: MapSchema<Player>): string | null => {
    const playerEntries = Array.from(players.entries());
  
    if (playerEntries.length !== 2) {
      // Ensure there are exactly 2 players
      return null;
    }
  
    const [entry1, entry2] = playerEntries;
    const [sessionID1, player1] = entry1;
    const [sessionID2, player2] = entry2;
  
    if (!player1.move || !player2.move) {
      // Ensure both players have made a move
      return null;
    }
  
    const winMap: Record<string, string> = {
      'rock': "scissors",
      'paper': "rock",
      'scissors': "paper",
    };
  
    if (player1.move === player2.move) {
      return 'tie'; // It's a tie
    }
  
    return winMap[player1.move] === player2.move ? sessionID1 : sessionID2;
  }