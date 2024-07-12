# Discord Rock 🪨 Paper 📃 Scissors ✂️

a Rock-Paper-Scissors game built using Vite, React, and TypeScript. Colyseus is used for multiplayer functionality and state management, and Discord's embedded app sdk allows it to be played within a discord voice channel.

## Features

- **Multiplayer Support**: Play Rock-Paper-Scissors with your friends in real-time.
- **Discord Integration**: Seamlessly play the game within a Discord voice channel using Discord's embedded app SDK.
- **State Management**: Utilizes React's state management to maintain game state across different components.

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm
- Cloudflared

## Setup Instructions

   1. **Create a .env file in root**:
      - it should have the following variables: 
   ```bash
   VITE_DISCORD_CLIENT_ID=your_discord_client_id
   DISCORD_CLIENT_SECRET=your_discord_client_secret
   ```

   2. **Install dependencies**:
   ```bash
   cd client
   npm install

   cd ../server
   npm install
   ```

   3. **Run app in dev mode**:
   - Terminal 1 (Client):

   ```bash
   cd client
   npm run dev
   ```

  - Terminal 2 (Server):

   ```bash
   cd server
   npm run local
   ```

  - Terminal 3 (Cloudflared/ngrok tunnel):

   ```bash
   cloudflared tunnel --url http://localhost:5173/
   ```




  4. **Set URL mapping**
     - Navigate to "URL Mappings" in the Discord Developer's portalm and enter the URL provided by cloudflared/ngrok

## How to play
- Be sure to add all players as testers in the discord developer's portal.
- Join a discord VC, and then start the activity
