import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { DiscordSDK } from '@discord/embedded-app-sdk'


/*
const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);


let auth;

async function setupDiscordSdk() {
  await discordSdk.ready();

  // authorize with Discord Client, get permissions
  const { code } = await discordSdk.commands.authorize({
    client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
    response_type: 'code',
    state: '',
    prompt: 'none',
    scope: [
      'identify',
      'guilds',
    ]
  });
  
  //get access token which gives us permission to make requests to the Discord API
  const response = await fetch('/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  const { access_token } = await response.json();

  //Authenticate with discord client (using access token)

  auth = await discordSdk.commands.authenticate({
    access_token: access_token
  });

  if(auth == null){
    throw new Error('Failed to authenticate with Discord');
  }

}

setupDiscordSdk().then(() => {
  console.log('Discord SDK is ready');
});

*/



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
