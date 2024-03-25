'use client';
import ChatWindow from '@/views/home/ChatWindow';
import RoomOptions from '@/views/home/RoomOptions';
import Sidebar from '@/views/home/Sidebar';

export default function Home() {
  return (
    <div className='h-screen flex w-full'>
      <Sidebar />
      <ChatWindow />
      <RoomOptions/>
    </div>
  );
}
