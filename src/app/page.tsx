'use client';
import Loading from '@/components/Loading';
import { useAuth } from '@/hooks/useAuth';
import ChatWindow from '@/views/home/ChatWindow';
import RoomOptions from '@/views/home/RoomOptions';
import Sidebar from '@/views/home/Sidebar';

export default function Home() {
    const user = useAuth();
    if (!user)
        return (
            <div className="h-screen flex items-center justify-center">
                <Loading />
            </div>
        );
    return (
        <div className="h-screen flex w-full">
            <Sidebar />
            <ChatWindow />
            <RoomOptions />
        </div>
    );
}
