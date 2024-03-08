'use client';
import Loading from '@/components/Loading';
import { auth } from '@/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { createContext, useEffect, useState } from 'react';
interface AuthGuardProps {
    children: React.ReactNode;
}

export const AuthContext = createContext(null);

const AuthGuard = ({ children }: AuthGuardProps) => {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();
    useEffect(() => {
        const unsubscibed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setIsLoading(false);
                router.push('/');
                return;
            }
        });
        setUser(null);
        router.push('/login');
        setIsLoading(false);
        return () => unsubscibed();
    }, [router]);

    if (isLoading) return <Loading />;

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthGuard;
