import { selectedRoomId } from '@/redux/chat/chatSlice';
import { RootState } from '@/redux/store';
import { Room } from '@/types/chat';
import { formatDistanceTime } from '@/utils/formatDistanceTime';
import mergeClassNames from '@/utils/mergeClassNames';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

interface RoomItemProps {
    room: Room;
}
const RoomItem = ({ room }: RoomItemProps) => {
    const { roomId } = useSelector((state: RootState) => state.chat);
    const dispatch = useDispatch();
    const handleSelectedRoom = () => {
        dispatch(selectedRoomId(room.id));
    };
    return (
        <div
            onClick={handleSelectedRoom}
            className={mergeClassNames(
                'cursor-pointer flex items-center justify-between gap-3 px-4 py-2 rounded hover:bg-gray-200 transition-all ease-linear',
                {
                    'bg-gray-200': roomId === room.id,
                },
            )}
        >
            <div className="flex-1 flex items-center gap-3">
                <div className="rounded-full h-[58px] w-[58px] border border-gray-200 overflow-hidden">
                    <Image
                        src={room.photoURL}
                        alt={room.roomName}
                        width={58}
                        height={58}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="flex-1 flex flex-col items-start justify-center">
                    <p className="select-none font-bold truncate max-w-[200px]">{room.roomName}</p>
                    <div className="w-full flex items-center justify-between text-xs">
                        <span className="select-none text-gray-600 font-light truncate max-w-[100px]">
                            {room.description}
                        </span>
                        <span className="font-normal whitespace-nowrap">
                            · {formatDistanceTime(room?.createdAt?.seconds)}
                        </span>
                    </div>
                </div>
            </div>
            <div className="w-3 h-3 rounded-full bg-primary"></div>
        </div>
    );
};

export default RoomItem;
