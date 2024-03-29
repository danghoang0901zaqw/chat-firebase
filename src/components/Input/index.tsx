import mergeClassNames from '@/utils/mergeClassNames';
import React, { KeyboardEvent, forwardRef } from 'react';

type InputType = 'text' | 'password' | 'email';

interface InputProps {
    type: InputType;
    value: string;
    label?: string;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
    isNumber?: boolean;
    defaultValue?: string;
    autoComplete?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    maxLength?: number;
    onChange: (value: string) => void;
    onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void;
}
const Input = ({
    type = 'text',
    value,
    label,
    placeholder,
    disabled,
    className,
    isNumber,
    leftIcon,
    rightIcon,
    maxLength,
    defaultValue,
    autoComplete,
    onChange,
    onEnter,
    ...props
}: InputProps) => {
    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.startsWith(' ')) return;
        if (isNumber) {
            const numberRegex = /^\d*(\.\d{0,})?$/;
            if (!numberRegex.test(value)) return;
            onChange(value);
            return;
        }
        onChange(value);
    };

    return (
        <>
            {label && <p className="text-base font-medium mb-1">{label}</p>}
            <div className="flex items-center bg-gray-100 border border-gray-400 rounded-lg overflow-hidden">
                {leftIcon && (
                    <span className="ml-3 cursor-pointer w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all">
                        {leftIcon}
                    </span>
                )}
                <input
                    // ref={ref}
                    value={value}
                    type={type}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={mergeClassNames('outline-none w-full rounded-lg bg-transparent p-2 text-base', className)}
                    onChange={handleChangeValue}
                    onKeyPress={(e) => onEnter && onEnter(e)}
                    {...props}
                />
                {rightIcon && (
                    <span className="mr-3 cursor-pointer w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all">
                        {rightIcon}
                    </span>
                )}
            </div>
        </>
    );
};

export default (Input);
