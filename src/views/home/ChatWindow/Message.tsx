import mergeClassNames from '@/utils/mergeClassNames';
import Image from 'next/image';

const Message = ({ itsMe }: { itsMe: boolean }) => {
    return (
        <div
            className={mergeClassNames('flex items-end justify-start gap-2', {
                'justify-end gap-0': itsMe,
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
                    'bg-primary': itsMe,
                })}
            >
                <p
                    className={mergeClassNames('break-words', {
                        'text-white': itsMe,
                    })}
                >
                    https://kizsd-my.sharepoint.com/:f:/g/personal/longvulinhhoang_edu_thptbinhmai_edu_vn/Eq8Hc5VP53JOmRe0oEs1AecBuSlNFypgZlQFv7lp4yzSGA?email=danghoang0901zaqwe%40gmail.com&e=7LsZV3
                </p>
            </div>
        </div>
    );
};

export default Message;
