import React, { useEffect, useState } from 'react'
import placeholderAvatar from '../assets/placeholderavatar.png'
import { useDiscord } from '../lib/Contexts/DiscordContext'
import { ColyseusClient } from '../lib/ColyseusClient';
import { getRooms, getDiscordAvatarUrl } from '../lib/utils';
import { useRoom } from '../lib/Contexts/RoomContext';
import { useNavigate } from "react-router-dom"

export default function Lobby() {
  const [loading, setLoading] = useState(true);
  const { discordSdk, auth } = useDiscord();
  const [rooms, setRooms] = useState<any[]>([]);
  const [reload, setReload] = useState(0);
  const { room, setRoom } = useRoom();
  
  let navigate = useNavigate();

  const joinRoom = async(roomID: string) => {
    setLoading(true);
    try {
      if(!auth?.user) throw new Error("Not authenticated");
      const room = await ColyseusClient.joinById(roomID, {
        name: auth?.user.username,
        pfp: getDiscordAvatarUrl(auth?.user.id, auth?.user.avatar!),
      });
  

      console.log("joined successfully", room);
      setRoom(room!);
      navigate('/game');
    
    } catch (e) {
      console.error("join error", e);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    console.log('refresh!');
    setLoading(true);
    //fetch rooms from server
    const fetchRooms = async() => {
      try {
        const rooms = await getRooms(discordSdk.channelId!);
        setRooms(rooms);
      } catch (e) {
          console.error(e);
      } finally {
        setLoading(false);
      }
    }

    if(discordSdk.channelId){
      fetchRooms();
    }
    
  }, [discordSdk, reload])




  //if loading, show a loading state
  if(rooms.length == 0){
    return <div>Loading...</div>
  }

  const useRooms = rooms.map((room) => (
      <div key={room.id} className="w-full max-w-4xl my-2 p-4 border border-gray-200 rounded-lg shadow-md flex flex-col items-start">
        <div className="flex justify-between w-full items-center">
          <h2 className="text-xl font-semibold">{`${room.name} ${room.metadata.roomCode}`}</h2>
          <button disabled={room.clients == 2} className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${room.clients == 2? 'opacity-50' : ''}`} onClick={async() => joinRoom(room.roomId)}>
            Join
          </button>
        </div>
        <div className="flex mt-4">
          <img src={room.metadata.players[0]?.pfp || placeholderAvatar} alt="Avatar 1" className="w-10 h-10 rounded-full mr-4" /> 
          <img src={room.metadata.players[1]?.pfp || placeholderAvatar} alt="Avatar 2" className="w-10 h-10 rounded-full" /> 
        </div>
      </div>
  ))

  return (
    <div className='container'>
        <h1 className='font-extrabold text-5xl'>Games</h1>
        <button onClick={() => setReload(reload + 1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"> Reload </button>
        <div className="flex flex-col items-center justify-center p-4">
          {useRooms}
    </div> 
    </div>
  )

}
