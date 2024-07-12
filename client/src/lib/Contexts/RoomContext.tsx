import { createContext, useState, useContext } from "react";
import type { Room } from "colyseus.js";
import { RoomContextType } from "../../types";

export const RoomContext = createContext<RoomContextType | null>(null);

export const RoomProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [room, setRoom] = useState<Room | null>(null);

    const value = { room, setRoom };

    return (
        <RoomContext.Provider value = { {room, setRoom} }>
            {children}
        </RoomContext.Provider>
    )
}

export const useRoom = () => {
    const context = useContext(RoomContext);
    if (context === null) {
        throw new Error('useRoom must be used within a RoomProvider');
    }
    return context;
}
