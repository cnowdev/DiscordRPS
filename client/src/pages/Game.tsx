import React, { useEffect, useState } from 'react';
import { useRoom } from '../lib/Contexts/RoomContext';
import { Choice } from '../components/Choice';
import { getOpponent } from '../lib/utils';
import { Player } from '../types';
import placeholderAvatar from '../assets/placeholderavatar.png';
import { useNavigate } from 'react-router-dom';

export default function Game() {
  const { room } = useRoom();
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isMoveSubmitted, setIsMoveSubmitted] = useState<boolean>(false);
  const [opponent, setOpponent] = useState<Player | null>(null); 
  const [gameResult, setGameResult] = useState<string | null>(null);

  let navigate = useNavigate();

  useEffect(() => {
    if (!room) return;

    const handleStateChange = (state: any) => {
      const currentOpponent = getOpponent(state.players, room.sessionId);
      setOpponent(currentOpponent);
    };

    room.onStateChange(handleStateChange);

    room.onMessage('result', (message: any) => {
      setGameResult(message.winner);
    })

  }, [room]);

  const submitMove = () => {
    if (!room) return;

    room.send('move', { move: selectedChoice });
    setIsMoveSubmitted(true);
  }

  const leaveRoom = () => {
    room?.leave();
    navigate('/');
  }

  if (!opponent) {
    return (
      
      <div className="flex flex-col items-center justify-center min-h-screen align-middle ">
        <p>Waiting for opponent...</p>
        <button className="m-4 text-red-600" onClick={() => leaveRoom()}>Leave</button>
      </div>
    );
  }

  if(gameResult && room) {
    let winner;
    gameResult == room.sessionId? winner = room.state.players.get(room.sessionId): winner = opponent;

    return (
      <div className="flex flex-col items-center justify-center h-screen">
      <button className="self-start m-4 text-red-600" onClick={() => leaveRoom()}>Leave</button>
      <div className="flex flex-col items-center justify-center w-full h-full">
        {winner?.pfp ? (
          <img src={winner.pfp} alt="Winner's profile picture" className="w-32 h-32 mb-4 rounded-full" />
        ) : (
          <div className="w-32 h-32 mb-4 bg-gray-200 rounded-full"></div>
        )}
        {gameResult === room.sessionId ? (
          <p className="text-4xl font-bold">You Won!</p>
        ) : gameResult !== 'tie' ? (
          <p className="text-4xl font-bold">You Lost.</p>
        ) : (
          <p className="text-4xl font-bold">It's a Tie!</p>
        )}
        <p className="mt-4 text-xl">Your Opponent chose: {opponent?.move}</p>
      </div>
    </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-scree">
      <div className="flex justify-between w-full px-4 py-2 shadow-md">
        <button className="text-red-500 hover:text-red-700">Leave</button>
        <div className="flex items-center">
          <span className="mr-2">Opponent: </span>
          <img src={opponent?.pfp || placeholderAvatar} alt="Avatar 1" className="w-10 h-10 rounded-full mr-4" />
        </div>
      </div>
      <div className="flex justify-center mt-10 space-x-10">
        <Choice emoji="✊" label="Rock" selectedChoice={selectedChoice} setSelectedChoice={setSelectedChoice} />
        <Choice emoji="✋" label="Paper" selectedChoice={selectedChoice} setSelectedChoice={setSelectedChoice} />
        <Choice emoji="✌️" label="Scissors" selectedChoice={selectedChoice} setSelectedChoice={setSelectedChoice} />
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10 text-4xl" onClick={() => submitMove()}>Submit</button>
    </div>
  );
}
