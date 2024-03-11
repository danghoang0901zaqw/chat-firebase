import useApp from '@/hooks/useApp';
import Image from 'next/image';
import ContentChatWindow from './Content';

const ChatWindow = () => {
    const { roomActive } = useApp();

    if (!roomActive)
        return (
            <div className="flex-1 flex items-center justify-center">
                <Image
                    src="/images/user.png"
                    width={200}
                    height={200}
                    alt="no-room"
                    className="object-cover opacity-40 select-none"
                />
            </div>
        );

    return <ContentChatWindow roomActive={roomActive} />;
};

export default ChatWindow;
