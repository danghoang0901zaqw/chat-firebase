'use client';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import RoomItem from './RoomItem';

const Sidebar = () => {
    return (
        <div className="w-[360px] h-full flex flex-col border-r border-gray-200">
            <div className="flex items-center justify-between h-[50px] px-4 border-b border-gray-200">
                <div className="cursor-pointer h-9 w-9 rounded-full border border-gray-900 overflow-hidden">
                    <Image
                        src="https://images.pexels.com/photos/20330737/pexels-photo-20330737/free-photo-of-white-dog-sitting-on-grass.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                        alt="user"
                        width={36}
                        height={36}
                        className="h-full w-full object-cover"
                    />
                </div>
                <p className="font-semibold select-none">Chat</p>
                <i className="cursor-pointer w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all">
                    <FontAwesomeIcon icon={faPenToSquare} size="lg" />
                </i>
            </div>
            <div className="flex-1 overflow-y-auto p-1">
                {Array.from({ length: 20 }).map((_, index) => (
                    <RoomItem key={index} />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
