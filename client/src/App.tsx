import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DiscordProvider } from './lib/Contexts/DiscordContext';

import Lobby from './pages/Lobby';
import Game from './pages/Game';
import { RoomProvider } from './lib/Contexts/RoomContext';

function App() {

  return (
    <div className=''>
      <RoomProvider>
      <DiscordProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Lobby/>}/>
          <Route path='/game' element={<Game/>}/>
        </Routes>
      </BrowserRouter>
      </DiscordProvider>
      </RoomProvider>
    </div>
  )
}

export default App
