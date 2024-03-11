import { AuthContext } from '@/auth/AuthGuard';
import { useContext } from 'react';

export const useAuth = () => useContext(AuthContext);
