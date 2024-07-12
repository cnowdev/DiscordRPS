import React, { createContext, useContext, useEffect, useState } from 'react';
import { DiscordSDK, CommandResponseTypes } from '@discord/embedded-app-sdk';
import { DiscordContextType } from '../../types';


export const DiscordContext = createContext<DiscordContextType>({ discordSdk: new DiscordSDK(''), auth: null });

export const DiscordProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {

    const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID || '');
    const [auth, setAuth] = useState<CommandResponseTypes['authenticate'] | undefined>(undefined);




    useEffect(() => {

        async function setupDiscordSdk() {
            try {

            await discordSdk.ready();


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





            //get access token which gives permission to make requests to discord api

            const response = await fetch('/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });




            const { access_token } = await response.json();
            
        
            

            const authenticatedUser = await discordSdk.commands.authenticate({
                access_token: access_token
            });

            console.log(authenticatedUser);
            
            if(authenticatedUser == null){
                throw new Error('Failed to authenticate with Discord');
            }

            setAuth(authenticatedUser);

        } catch (e) {
            console.log(e);
        }
        }   

        console.log('hello');

        setupDiscordSdk().then(() => {
            console.log('discord sdk is ready')
        })
    
    }, []);


    const value = { discordSdk , auth };

    return (
        <DiscordContext.Provider value={value as DiscordContextType}>
            {children}
        </DiscordContext.Provider>

    )

}


export const useDiscord = () => useContext(DiscordContext)