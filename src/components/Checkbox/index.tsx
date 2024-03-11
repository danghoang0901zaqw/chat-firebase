import mergeClassNames from '@/utils/mergeClassNames';
import { ChangeEvent } from 'react';
import CheckIcon from '../../../public/images/icons/CheckIcon';

interface CheckboxProps {
    children?: React.ReactNode;
    checked?: boolean;
    value: string | number;
    onCheckbox: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}
const Checkbox = ({ onCheckbox, value, checked, className, children }: CheckboxProps) => {
    return (
        <label
            htmlFor={`${value}`}
            className={mergeClassNames('flex items-center w-full px-3 py-2 cursor-pointer', className, {
                'justify-between': children,
            })}
        >
            {children}
            <div className="grid mr-3 place-items-center">
                <div className="inline-flex items-center">
                    <label className="relative flex items-center p-0 rounded-full cursor-pointer" htmlFor={`${value}`}>
                        <input
                            checked={checked}
                            id={`${value}`}
                            value={value}
                            onChange={(e) => onCheckbox(e)}
                            type="checkbox"
                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-400 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-gray-400 before:opacity-0 before:transition-opacity checked:border-primary checked:bg-primary checked:before:bg-primary hover:before:opacity-10"
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                            <CheckIcon />
                        </span>
                    </label>
                </div>
            </div>
        </label>
    );
};

export default Checkbox;
