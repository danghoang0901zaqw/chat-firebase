'use client';
import { useAuth } from '@/hooks/useAuth';
import useGetAllFirestore from '@/hooks/useGetAllFirestore';
import useQueryFirestore from '@/hooks/useQueryFirestore';
import { RootState } from '@/redux/store';
import { App } from '@/types/app';
import { Condition, Room } from '@/types/chat';
import React, { createContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
interface AppProviderProps {
    children: React.ReactNode;
}

export const AppContext = createContext<App>({
    listRoom: [],
    roomActive: undefined,
    users: []
});

const AppProvider = ({ children }: AppProviderProps) => {
    const user = useAuth();
    const { roomId } = useSelector((state: RootState) => state.chat);
    const roomCondition: Condition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            value: user.uid,
        };
    }, [user.uid]);

    const listRoom = useQueryFirestore('rooms', roomCondition);

    const roomActive =
        listRoom.length === 0 ? undefined : listRoom.find((room: Room) => room.id === roomId) || listRoom[0];

    const users = useGetAllFirestore('users')
    return (
        <AppContext.Provider
            value={{
                listRoom,
                roomActive,
                users
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
