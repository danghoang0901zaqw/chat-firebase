import { addDocument } from '@/firebase/services';
import { useAuth } from '@/hooks/useAuth';
import { RootState } from '@/redux/store';
import { Room } from '@/types/chat';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { KeyboardEvent, MutableRefObject, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import HeadRoom from './HeadRoom';
import MessageList from './MessageList';

interface ContentChatWindowProps {
    roomActive: Room;
}

const ContentChatWindow = ({ roomActive }: ContentChatWindowProps) => {
    const contentMessageRef = useRef() as MutableRefObject<HTMLDivElement>;
    const user = useAuth();
    const { roomId } = useSelector((state: RootState) => state.chat);
    const [value, setValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleScrollToBottom = () => {
        contentMessageRef.current.scrollTo({
            top: contentMessageRef.current.scrollHeight,
            left: 0,
        });
    };

    useEffect(() => {
        handleScrollToBottom();
    }, [roomId]);

    const handleSentMessage = async () => {
        await addDocument(
            'messages',
            {
                message: value,
                uid: user.uid,
                photoURL: user.photoURL,
                roomId,
                displayName: user.displayName
            },
            'Gửi tin nhắn thất bại',
        );
        setValue('');
        inputRef.current?.focus();
    };

    const handleSubmitMessage = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (!value) return;
        if (e.code === 'Enter') {
            await handleSentMessage();
        }
    };

    return (
        <div className="w-full flex flex-col">
            <HeadRoom roomActive={roomActive} />
            <div ref={contentMessageRef} className="flex-1 overflow-y-auto py-2 w-full">
                <MessageList />
            </div>
            <div className="h-14 flex items-center p-2 gap-2">
                <div className="flex-1 h-full w-full rounded-3xl bg-gray-100 overflow-hidden">
                    <input
                        ref={inputRef}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Aa"
                        className="px-3 py-2 outline-none w-full h-full bg-gray-100 caret-primary placeholder:font-medium placeholder:text-gray-600"
                        type={'text'}
                        onKeyPress={handleSubmitMessage}
                    />
                </div>
                <span
                    onClick={handleSentMessage}
                    className="w-10 h-full rounded-full bg-gray-200 cursor-pointer flex items-center justify-center hover:bg-gray-100 transition-all"
                >
                    <FontAwesomeIcon icon={faPaperPlane} size="lg" className="text-primary" />
                </span>
            </div>
        </div>
    );
};

export default ContentChatWindow;
