import useApp from '@/hooks/useApp';
import { useAuth } from '@/hooks/useAuth';
import useQueryFirestore from '@/hooks/useQueryFirestore';
import { Condition, MessageType } from '@/types/chat';
import { forwardRef, useMemo } from 'react';
import Message from './Message';

const MessageList = () => {
    const { roomActive } = useApp();
    const user = useAuth();
    const msgCondition: Condition = useMemo(() => {
        return {
            fieldName: 'roomId',
            operator: '==',
            value: roomActive?.id,
        };
    }, [roomActive?.id]);

    const messages = useQueryFirestore('messages', msgCondition);

    return (
        <div className="h-full w-full flex flex-col justify-end gap-3">
            {messages.map((message: MessageType, index: number) => {
                const itsMe = user.uid === message.uid;
                return <Message key={index} itsMe={itsMe} message={message} />;
            })}
        </div>
    );
};

export default forwardRef(MessageList);
