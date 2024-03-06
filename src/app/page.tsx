'use client';
import ChatWindow from '@/views/home/ChatWindow';
import Sidebar from '@/views/home/Sidebar';

export default function Home() {
  return (
    <div className='h-screen flex'>
      <Sidebar />
      <ChatWindow />
    </div>
  );
}
