'use client';
import { useAuth } from '@/hooks/useAuth';
import useQueryFirestore from '@/hooks/useQueryFirestore';
import { Condition } from '@/types/chat';
import React, { createContext, useMemo } from 'react';
interface AppProviderProps {
    children: React.ReactNode;
}

export const AppContext = createContext({
    listRoom: [],
});

const AppProvider = ({ children }: AppProviderProps) => {
    const user = useAuth();
    const roomCondition: Condition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: '==',
            value: user.uid,
        };
    }, [user.uid]);

    const listRoom = useQueryFirestore('rooms', roomCondition);
    
    return (
        <AppContext.Provider
            value={{
                listRoom,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
