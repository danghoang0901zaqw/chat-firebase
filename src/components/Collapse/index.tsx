import mergeClassNames from '@/utils/mergeClassNames';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
interface CollapseProps {
    title: string;
    children: React.ReactNode;
}

const Collapse = ({ title, children }: CollapseProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleToogle = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <div>
            <div
                onClick={handleToogle}
                className="mx-2 px-4 py-3 flex items-center justify-between rounded-md hover:bg-gray-300 cursor-pointer"
            >
                <p className="select-none text-sm font-medium">{title}</p>
                <FontAwesomeIcon
                    icon={faChevronRight}
                    className={mergeClassNames('transition-all duration-200', {
                        'rotate-90': isOpen,
                    })}
                />
            </div>
            <div
                className={mergeClassNames('grid transition-all duration-300 ease-in-out grid-rows-[0fr] opacity-0', {
                    'grid-rows-[1fr] opacity-100': isOpen,
                })}
            >
                <div className="overflow-hidden">{children}</div>
            </div>
        </div>
    );
};

export default Collapse;
