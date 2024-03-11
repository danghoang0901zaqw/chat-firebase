'use client';
import Loading from '@/components/Loading';
import { auth } from '@/firebase/config';
import { User } from '@/types/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { createContext, useEffect, useState } from 'react';
interface AuthGuardProps {
    children: React.ReactNode;
}

export const AuthContext = createContext({} as User);

const AuthGuard = ({ children }: AuthGuardProps) => {
    const [user, setUser] = useState<User | {}>({} as User);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();
    useEffect(() => {
        const unsubscibed = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({
                    displayName,
                    email,
                    uid,
                    photoURL,
                });
                setIsLoading(false);
                router.push('/');
                return;
            }
        });
        setUser({});
        router.push('/login');
        setIsLoading(false);
        return () => unsubscibed();
    }, [router]);

    if (isLoading) return <Loading />;

    return <AuthContext.Provider value={user as User}>{children}</AuthContext.Provider>;
};

export default AuthGuard;
