'use client';
import { auth } from '@/firebase/config';
import { User } from '@/types/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { createContext, useEffect, useState } from 'react';
interface AuthGuardProps {
    children: React.ReactNode;
}

export const AuthContext = createContext<User | null>(null);

const AuthGuard = ({ children }: AuthGuardProps) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    useEffect(() => {
        const unsubscibed = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({
                    displayName: displayName ?? '',
                    email: email ?? '',
                    uid,
                    photoURL: photoURL ?? '/images/user.png',
                });
                return;
            }
        });
        setUser(null);
        return () => unsubscibed();
    }, [router]);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthGuard;
