import Modal from '@/components/Modal';
import { auth } from '@/firebase/config';
import { useAuth } from '@/hooks/usAuth';
import { faPencil, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface UserOptionsProps {
    visible: boolean;
    onCancel?: () => void;
}
const UserOptions = ({ visible, onCancel }: UserOptionsProps) => {
    const user = useAuth();
    const router = useRouter();
    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success('Đăng xuất thành công');
            router.push('/login');
        } catch (error) {
            toast.error('Đăng xuất thất bại');
        }
    };

    return (
        <Modal title="Tùy chọn" visible={visible} onCancel={onCancel}>
            <div>
                <div className="">
                    <p className="text-sm font-semibold mb-2">Tài khoản</p>
                    <div className="flex items-center justify-between gap-3 p-2 cursor-pointer w-full rounded-lg hover:bg-gray-100 transition-all duration-300">
                        <div className="flex items-center gap-3">
                            <Image
                                src={user.photoURL}
                                alt={user.displayName}
                                width={64}
                                height={64}
                                className="w-16 h-16 rounded-full object-cover border border-gray-200"
                            />
                            <div>
                                <p className="text-sm font-semibold mb-1">{user.displayName}</p>
                                <p className="text-xs font-normal text-gray-700">Sửa tên và ảnh đại diện</p>
                            </div>
                        </div>
                        <span className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-200">
                            <FontAwesomeIcon icon={faPencil} />
                        </span>
                    </div>
                </div>
                <div
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-2 cursor-pointer w-full rounded-lg hover:bg-gray-100 transition-all duration-300"
                >
                    <span className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-200">
                        <FontAwesomeIcon icon={faSignOut} />
                    </span>
                    <p className="text-sm font-semibold">Đăng xuất</p>
                </div>
            </div>
        </Modal>
    );
};

export default UserOptions;
