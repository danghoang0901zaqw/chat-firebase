import { forwardRef } from 'react';
import Message from './Message';

const MessageList = () => {
    return <div className='h-full w-full'>
        {Array.from({ length: 20 }).map((_, index: number) => {
            const itsMe = index % 2 === 0
            return <Message key={index} itsMe={itsMe} />
        })}
    </div>;
};

export default forwardRef(MessageList);
