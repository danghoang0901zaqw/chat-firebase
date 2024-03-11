import mergeClassNames from '@/utils/mergeClassNames';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Button from '../Button';
interface ModalProps {
    visible: boolean;
    children: React.ReactNode;
    textBtnConfirm?: string;
    title?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}
const Modal = ({ visible = false, children, title, onCancel, onConfirm, textBtnConfirm }: ModalProps) => {
    return (
        <div
            className={mergeClassNames(
                'fixed inset-0 z-50 bg-overlay/60 flex items-center justify-center opacity-0 invisible transition-all ease-linear',
                {
                    'opacity-1 visible': visible,
                },
            )}
        >
            <div onClick={onCancel} className="fixed inset-0 z-50"></div>
            <div
                className={mergeClassNames(
                    'w-[96vw] md:w-[548px] z-[99] flex flex-col items-center justify-center rounded-[14px] -translate-y-24 bg-white border border-black/0 shadow opacity-0 invisible transition-all',
                    {
                        '-translate-y-0 opacity-1 visible': visible,
                    },
                )}
            >
                <div className="w-full relative">
                    {title && <p className="font-medium text-center pt-5">{title}</p>}
                    <i
                        onClick={onCancel}
                        className="absolute top-4 right-4 cursor-pointer w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-all"
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </i>
                </div>
                <div className="w-full p-3">
                    {children}
                    {onConfirm && (
                        <Button primary onClick={onConfirm} className="w-full text-center">
                            {textBtnConfirm}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
