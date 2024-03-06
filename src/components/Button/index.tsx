import mergeClassNames from '@/utils/mergeClassNames';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    primary?: boolean;
    outline?: boolean;
    text?: boolean;
    disabled?: boolean;
    rounded?: boolean;
    small?: boolean;
    large?: boolean;
    to?: string;
    href?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    className?: string;
    onClick?: () => void;
}
const Button = ({
    children,
    primary = false,
    outline = false,
    text = false,
    disabled = false,
    rounded = false,
    small = false,
    large = false,
    className,
    to,
    href,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}: ButtonProps) => {
    let Comp: React.ElementType = 'button';
    const props: any = {
        onClick,
        ...passProps,
    };
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key as keyof typeof props] === 'function') {
                delete props[key as keyof typeof props];
            }
        });
    }
    if (to) {
        props.href = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    return (
        <Comp
            {...props}
            className={mergeClassNames(
                'inline-flex items-center justify-center min-w-[100px] py-2 px-4 font-bold text-base cursor-pointer bg-white rounded-lg border border-transparent select-none',
                className,
                {
                    'py-2 min-w-[88px]': small,
                    'py-3 min-w-[140px]': large,
                    'pointer-events-none opacity-50': disabled,
                    'ml-2': (rightIcon || leftIcon) && children,
                    'rounded-full shadow-[0 2px 8px #0000000f] border-[#1618231f] hover:bg-[#16182308] hover:border-[#16182333]':
                        rounded,
                    'hover:underline': text,
                    'text-white bg-primary border-primary hover:border-primary hover:bg-primary/[95] ': primary,
                    'text-primary border-current hover:border-current hover:bg-[#fe2c550f]': outline,
                },
            )}
        >
            {leftIcon && <span>{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span>{rightIcon}</span>}
        </Comp>
    );
};

export default Button;
