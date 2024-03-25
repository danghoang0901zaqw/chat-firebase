import { Room } from '@/types/chat';
import { formatDistanceTime } from '@/utils/formatDistanceTime';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

interface HeadRoomProps {
    roomActive: Room;
}

const HeadRoom = ({ roomActive }: HeadRoomProps) => {
    return (
        <div className="w-full flex items-center justify-between h-14 px-3 py-2">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden">
                    <Image
                        src={roomActive.photoURL}
                        alt={roomActive.roomName}
                        width={1}
                        height={1}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col items-start justify-center">
                    <p className="font-bold truncate max-w-[300px]">{roomActive.roomName}</p>
                    <p className="text-xs text-gray-600">Hoạt động {formatDistanceTime(roomActive.createdAt.seconds)}</p>
                </div>
            </div>
            <i className="cursor-pointer w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all">
                <FontAwesomeIcon icon={faEllipsis} className="text-primary" />
            </i>
        </div>
    );
};

export default HeadRoom;
