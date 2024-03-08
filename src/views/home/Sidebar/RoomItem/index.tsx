import Image from 'next/image';

const RoomItem = () => {
    return (
        <div className="cursor-pointer flex items-center justify-between px-4 py-2 rounded hover:bg-gray-200 transition-all ease-linear">
            <div className="rounded-full h-[58px] w-[58px] border border-gray-200 overflow-hidden">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/chataap-34af1.appspot.com/o/images%2Frooms_avatar%2Fpe0dBPnY8yAkOwdiCUDU%2F1682303374833_92137_605f7dde-8665-4024-8f79-2beba3c73146_Screenshot%202023-04-24%20092935.png?alt=media&token=c9424a3e-eb8a-4ebd-8b46-288ea3815aca"
                    alt="item"
                    width={58}
                    height={58}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="flex flex-col items-start justify-center">
                <p className="select-none font-bold truncate max-w-[200px]">
                    Lãnh chúa Thắng Lãnh chúa Thắng Lãnh chúa Thắng Lãnh chúa Thắng Lãnh chúa Thắng Lãnh chúa Thắng Lãnh
                    chúa Thắng
                </p>
                <div className="flex items-center justify-center text-xs">
                    <span className="select-none text-gray-600 font-light truncate max-w-[200px]">
                        Nguyễn Thành Nam đã tham gia cuộc trò chuyện (Nguyễn Thành Nam joined the conversation )
                    </span>
                    <span className="font-normal whitespace-nowrap"> · 1Th3</span>
                </div>
            </div>
            <div className="w-3 h-3 rounded-full bg-primary"></div>
        </div>
    );
};

export default RoomItem;
