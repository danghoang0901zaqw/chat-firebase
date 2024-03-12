import Collapse from '@/components/Collapse';
import useApp from '@/hooks/useApp';
import { useAuth } from '@/hooks/useAuth';
import { RootState } from '@/redux/store';
import { User } from '@/types/auth';
import mergeClassNames from '@/utils/mergeClassNames';
import { faBell, faEllipsis, faImage, faPencil, faSearch, faSignature } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useSelector } from 'react-redux';

const RoomOptions = () => {
    const { isOpenRoomOptions } = useSelector((state: RootState) => state.chat);
    const { roomActive, membersInARoom } = useApp();
    const user = useAuth();

    return (
        <div
            className={mergeClassNames(
                'flex flex-col h-screen overflow-y-auto w-0 translate-x-full border-l border-l-gray-200 transition-all duration-300',
                {
                    'translate-x-0 min-w-[280px]': isOpenRoomOptions,
                },
            )}
        >
            <div className="flex flex-col items-center py-5 gap-3">
                <Image
                    src={roomActive?.photoURL ?? '/images/user.png'}
                    alt={roomActive?.roomName ?? 'room-options'}
                    width={80}
                    height={80}
                    className="rounded-full object-cover select-none"
                />
                <div>
                    <p className="text-center font-semibold max-w-[240px] truncate">{roomActive?.roomName}</p>
                    <p className="text-center text-xs select-none text-gray-600 font-light">Hoạt động 8 giờ trước</p>
                </div>
                <div className="flex justify-center items-center">
                    <div className="flex flex-col items-center justify-center gap-2 px-4">
                        <span className="cursor-pointer w-9 h-9 rounded-full flex items-center justify-center bg-gray-300 hover:bg-gray-200 transition-all">
                            <FontAwesomeIcon icon={faBell} />
                        </span>
                        <p className="text-xs font-medium">Tắt thông báo</p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2 px-4">
                        <span className="cursor-pointer w-9 h-9 rounded-full flex items-center justify-center bg-gray-300 hover:bg-gray-200 transition-all">
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <p className="text-xs font-medium">Tìm kiếm</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
                <Collapse title="Tuỳ chỉnh đoạn chat">
                    <ul className="px-2">
                        <li className="flex items-center gap-2 p-2 hover:bg-gray-300 transition-all duration-200 cursor-pointer rounded-lg">
                            <span className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                                <FontAwesomeIcon icon={faPencil} />
                            </span>
                            <p className="font-medium text-sm">Đổi tên đoạn chat</p>
                        </li>
                        <li className="flex items-center gap-2 p-2 hover:bg-gray-300 transition-all duration-200 cursor-pointer rounded-lg">
                            <span className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                                <FontAwesomeIcon icon={faImage} />
                            </span>
                            <p className="font-medium text-sm">Thay đổi ảnh nhóm</p>
                        </li>
                        <li className="flex items-center gap-2 p-2 hover:bg-gray-300 transition-all duration-200 cursor-pointer rounded-lg">
                            <span className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                                <FontAwesomeIcon icon={faSignature} />
                            </span>
                            <p className="font-medium text-sm">Chỉnh sửa biệt danh</p>
                        </li>
                    </ul>
                </Collapse>

                <Collapse title={`Thành viên đoạn chat (${membersInARoom?.length})`}>
                    <div className="px-2">
                        {membersInARoom.map((member: User) => {
                            const itsMe = user.uid === member.uid;

                            return (
                                <div
                                    key={member.uid}
                                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-200 transition-all"
                                >
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={member.photoURL}
                                            alt={member.displayName}
                                            width={36}
                                            height={36}
                                            className="rounded-full object-cover"
                                        />
                                        <p className="font-medium text-sm max-w-[150px] truncate">
                                            {member.displayName} {itsMe && '(Bạn)'}
                                        </p>
                                    </div>
                                    <span className="cursor-pointer w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300">
                                        <FontAwesomeIcon icon={faEllipsis} />
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </Collapse>

                <Collapse title="File phương tiện">
                    <ul className="px-2">
                        <li className="flex items-center gap-2 p-2 hover:bg-gray-300 transition-all duration-200 cursor-pointer rounded-lg">
                            <span className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                                <FontAwesomeIcon icon={faPencil} />
                            </span>
                            <p className="font-medium text-sm">Đổi tên đoạn chat</p>
                        </li>
                        <li className="flex items-center gap-2 p-2 hover:bg-gray-300 transition-all duration-200 cursor-pointer rounded-lg">
                            <span className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                                <FontAwesomeIcon icon={faImage} />
                            </span>
                            <p className="font-medium text-sm">Thay đổi ảnh nhóm</p>
                        </li>
                        <li className="flex items-center gap-2 p-2 hover:bg-gray-300 transition-all duration-200 cursor-pointer rounded-lg">
                            <span className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                                <FontAwesomeIcon icon={faSignature} />
                            </span>
                            <p className="font-medium text-sm">Chỉnh sửa biệt danh</p>
                        </li>
                    </ul>
                </Collapse>

                <Collapse title="Quyền riêng tư và hỗ trợ">
                    <ul className="px-2">
                        <li className="flex items-center gap-2 p-2 hover:bg-gray-300 transition-all duration-200 cursor-pointer rounded-lg">
                            <span className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                                <FontAwesomeIcon icon={faPencil} />
                            </span>
                            <p className="font-medium text-sm">Đổi tên đoạn chat</p>
                        </li>
                        <li className="flex items-center gap-2 p-2 hover:bg-gray-300 transition-all duration-200 cursor-pointer rounded-lg">
                            <span className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                                <FontAwesomeIcon icon={faImage} />
                            </span>
                            <p className="font-medium text-sm">Thay đổi ảnh nhóm</p>
                        </li>
                        <li className="flex items-center gap-2 p-2 hover:bg-gray-300 transition-all duration-200 cursor-pointer rounded-lg">
                            <span className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                                <FontAwesomeIcon icon={faSignature} />
                            </span>
                            <p className="font-medium text-sm">Chỉnh sửa biệt danh</p>
                        </li>
                    </ul>
                </Collapse>
            </div>
        </div>
    );
};

export default RoomOptions;
