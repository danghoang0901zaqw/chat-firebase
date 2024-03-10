'use client';
import { useAuth } from '@/hooks/usAuth';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import RoomItem from './RoomItem';

const Sidebar = () => {
    const user = useAuth();

    return (
        <>
            <div className="w-[360px] h-full flex flex-col border-r border-gray-200">
                <div className="flex items-center justify-between h-[50px] px-4 border-b border-gray-200">
                    <div className="cursor-pointer h-9 w-9 rounded-full border border-gray-900 overflow-hidden">
                        <Image
                            src={user.photoURL}
                            alt={user.displayName}
                            width={36}
                            height={36}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <p className="font-semibold select-none">Chat</p>
                    <span className="cursor-pointer w-9 h-9 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all">
                        <FontAwesomeIcon icon={faPenToSquare} size="lg" />
                    </span>
                </div>
                <div className="flex-1 overflow-y-auto p-1">
                    {Array.from({ length: 20 }).map((_, index) => (
                        <RoomItem key={index} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Sidebar;
