import { MessageType } from '@/types/chat';
import mergeClassNames from '@/utils/mergeClassNames';
import Image from 'next/image';

interface MessageProps {
    message: MessageType;
    itsMe: boolean;
}

const TextContent = ({ text, itsMe }: { text: string; itsMe: boolean }) => {
    let Comp: any = 'p';
    const linkPrefixes = ['http://', 'https://', 'www.'];
    const props: any = {};
    if (linkPrefixes.some((prefix) => text.includes(prefix))) {
        Comp = 'a';
        props.href = text;
        props.target = '_blank';
    }

    return (
        <Comp
            className={mergeClassNames('break-words', {
                'text-white': itsMe,
                underline: Comp === 'a',
            })}
            {...props}
        >
            {text}
        </Comp>
    );
};
const Message = ({ message, itsMe }: MessageProps) => {
    return (
        <div
            className={mergeClassNames('flex items-end justify-start gap-2', {
                'justify-end gap-0': itsMe,
                'ml-2': !itsMe,
            })}
        >
            {!itsMe && (
                <div className="w-7 h-7 rounded-full overflow-hidden">
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/chataap-34af1.appspot.com/o/images%2Frooms_avatar%2Fpe0dBPnY8yAkOwdiCUDU%2F1682303374833_92137_605f7dde-8665-4024-8f79-2beba3c73146_Screenshot%202023-04-24%20092935.png?alt=media&token=c9424a3e-eb8a-4ebd-8b46-288ea3815aca"
                        alt="your"
                        width={28}
                        height={28}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            <div
                className={mergeClassNames('bg-gray-200 max-w-[300px] rounded-3xl px-4 py-2', {
                    'bg-primary mr-2': itsMe,
                })}
            >
                <TextContent text={message.contentMessage} itsMe={itsMe} />
            </div>
        </div>
    );
};

export default Message;
