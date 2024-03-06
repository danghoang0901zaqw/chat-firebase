import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

const HeadRoom = () => {
    return (
        <div className="w-full flex items-center justify-between h-14 px-3 py-2">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/chataap-34af1.appspot.com/o/images%2Frooms_avatar%2Fpe0dBPnY8yAkOwdiCUDU%2F1682303374833_92137_605f7dde-8665-4024-8f79-2beba3c73146_Screenshot%202023-04-24%20092935.png?alt=media&token=c9424a3e-eb8a-4ebd-8b46-288ea3815aca"
                        alt="user"
                        width={1}
                        height={1}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col items-start justify-center">
                    <p className="font-bold truncate max-w-[300px]">
                        Lãnh chúa Thắng Lãnh chúa Thắng Lãnh chúa Thắng Lãnh chúa Thắng Lãnh chúa Thắng Lãnh chúa Thắng
                        Lãnh chúa Thắng
                    </p>
                    <p className="text-xs text-gray-600">Hoạt động 4 giờ trước</p>
                </div>
            </div>
            <i className="cursor-pointer w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all">
                <FontAwesomeIcon icon={faEllipsis} className="text-primary" />
            </i>
        </div>
    );
};

export default HeadRoom;
