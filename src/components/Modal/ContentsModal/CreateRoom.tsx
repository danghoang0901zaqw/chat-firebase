import Checkbox from '@/components/Checkbox';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import { addDocument } from '@/firebase/services';
import useApp from '@/hooks/useApp';
import { useAuth } from '@/hooks/useAuth';
import useDebounced from '@/hooks/useDebounced';
import { User } from '@/types/auth';
import { defaultAvatar } from '@/utils/constaint';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface CreateRoomProps {
    visible: boolean;
    onCancel: () => void;
}
const CreateRoom = ({ visible, onCancel }: CreateRoomProps) => {
    const user = useAuth();
    const { users } = useApp();
    const [searchValue, setSearchValue] = useState<string>('');
    const valueDebounced = useDebounced(searchValue);
    const [searchUsers, setSearchUsers] = useState<User[]>([]);
    const [listMemberUid, setListMemberUid] = useState<string[]>([]);

    useEffect(() => {
        if (users.length > 1 && valueDebounced !== '') {
            let usersSearch = users.filter((member: User) => {
                let memberDisplayName = member.displayName.toLowerCase();
                return memberDisplayName.includes(valueDebounced) && member.uid !== user.uid;
            });

            // Sort ascending by ASCII
            for (let i = 0; i < usersSearch.length - 1; i++) {
                for (let j = i + 1; j < usersSearch.length; j++) {
                    if (usersSearch[i].displayName > usersSearch[j].displayName) {
                        let tmp = usersSearch[i];
                        usersSearch[i] = usersSearch[j];
                        usersSearch[j] = tmp;
                    }
                }
            }
            setSearchUsers(usersSearch);
        } else {
            setSearchUsers([]);
        }
    }, [valueDebounced, users, user.uid]);

    const handleSelectUser = (e: ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        const memberId = e.target.value;
        if (isChecked) {
            setListMemberUid((prev) => [...prev, memberId]);
        } else {
            const cloneListMember = [...listMemberUid];
            setListMemberUid(cloneListMember.filter((memberUId) => memberUId !== memberId));
        }
    };

    const handleCreateRoom = async () => {
        await addDocument(
            'rooms',
            {
                roomName: 'Cuộc trò chuyện mới',
                description: 'Tạo cuộc trò chuyện thành công',
                members: [user.uid, ...listMemberUid],
                photoURL: defaultAvatar,
            },
            'Tạo cuộc trò chuyện thất bại',
        );
        onCancel();
        setSearchValue('');
        toast.success('Tạo cuộc trò chuyện thành công');
    };

    return (
        <Modal
            title="Tạo nhóm chat"
            visible={visible}
            onCancel={onCancel}
            textBtnConfirm="Tạo nhóm chat"
            onConfirm={handleCreateRoom}
        >
            <Input
                leftIcon={<FontAwesomeIcon icon={faSearch} />}
                type={'text'}
                placeholder="Tìm kiếm"
                value={searchValue}
                onChange={(value: string) => setSearchValue(value)}
                className="caret-primary"
            />
            <div className="max-h-[400px] my-4 overflow-y-auto">
                {searchUsers.length === 0 ? (
                    <div>
                        <p>Chưa chọn người dùng nào </p>
                    </div>
                ) : (
                    searchUsers.map((user: User, index: number) => (
                        <Checkbox
                            className="p-2 rounded-lg hover:bg-gray-200 transition-all duration-300"
                            key={index}
                            value={user.uid}
                            onCheckbox={(e) => handleSelectUser(e)}
                        >
                            <div className="flex items-center justify-between  cursor-pointer">
                                <div className="flex items-center justify-center gap-3">
                                    <Image
                                        src={user.photoURL}
                                        alt="user"
                                        width={40}
                                        height={40}
                                        className="object-cover h-10 w-10 rounded-full"
                                    />
                                    <p className="font-semibold text-sm">{user.displayName}</p>
                                </div>
                            </div>
                        </Checkbox>
                    ))
                )}
            </div>
        </Modal>
    );
};

export default CreateRoom;
