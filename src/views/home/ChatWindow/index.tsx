import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import HeadRoom from './HeadRoom';
import MessageList from './MessageList';

const ChatWindow = () => {
    const contentMessageRef = useRef() as MutableRefObject<HTMLDivElement>;

    const handleScrollToBottom = () => {
        contentMessageRef.current.scrollTo({
            top: contentMessageRef.current.scrollHeight,
            left: 0,
        });
    };

    useEffect(() => {
        handleScrollToBottom();
    }, []);

    return (
        <div className="flex-1 flex flex-col">
            <HeadRoom />
            <div ref={contentMessageRef} className="flex-1 overflow-y-auto py-2 w-full">
                <MessageList />
            </div>
            <div className="h-14 flex items-center p-2 gap-2">
                <div className="flex-1 h-full w-full rounded-3xl bg-gray-100 overflow-hidden">
                    <input
                        placeholder="Aa"
                        className="px-3 py-2 outline-none w-full h-full bg-gray-100 caret-primary placeholder:font-medium placeholder:text-gray-600"
                    />
                </div>
                <i className="w-10 h-full rounded-full bg-gray-200 cursor-pointer flex items-center justify-center hover:bg-gray-100 transition-all">
                    <FontAwesomeIcon icon={faPaperPlane} size="lg" className="text-primary" />
                </i>
            </div>
        </div>
    );
};

export default ChatWindow;
