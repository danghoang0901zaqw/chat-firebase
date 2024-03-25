'use client';
import { useAuth } from '@/hooks/useAuth';
import useGetAllFirestore from '@/hooks/useGetAllFirestore';
import useQueryFirestore from '@/hooks/useQueryFirestore';
import { selectedRoomId } from '@/redux/chat/chatSlice';
import { RootState } from '@/redux/store';
import { App } from '@/types/app';
import { User } from '@/types/auth';
import { Condition, Room } from '@/types/chat';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
interface AppProviderProps {
    children: React.ReactNode;
}

export const AppContext = createContext<App>({
    listRoom: [],
    roomActive: undefined,
    users: [],
    membersInARoom: [],
});

const AppProvider = ({ children }: AppProviderProps) => {
    const user = useAuth();
    const dispatch = useDispatch();
    const { roomId } = useSelector((state: RootState) => state.chat);
    const [membersInARoom, setMembersInARoom] = useState<User[]>([]);
    const roomCondition: Condition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            value: user?.uid,
        };
    }, [user?.uid]);

    const listRoom = useQueryFirestore('rooms', roomCondition);

    const roomActive: any =
        listRoom.length === 0 ? undefined : listRoom.find((room: Room) => room.id === roomId) || listRoom[0];

    const users = useGetAllFirestore('users');

    useEffect(() => {
        if (roomActive) {
            dispatch(selectedRoomId(roomActive?.id));
            if (users.length >= 1) {
                const membersInRoom = users.filter((userMember: User) => {
                    return roomActive.members.includes(userMember.uid);
                });
                setMembersInARoom(membersInRoom);
            }
        }
    }, [dispatch, roomActive, users]);

    return (
        <AppContext.Provider
            value={{
                listRoom,
                roomActive,
                users,
                membersInARoom,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
