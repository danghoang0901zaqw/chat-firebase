import { AuthContext } from '@/context/auth/AuthGuard';
import { useContext } from 'react';

export const useAuth = () => useContext(AuthContext);
