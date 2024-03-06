import Image from 'next/image';
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex h-screen">
      <div className='flex-1'>
        {children}
      </div>
      <div className='hidden md:block flex-1 rounded-tl-lg rounded-bl-lg overflow-hidden'>
        <Image alt="background" width={0} height={0} src="/images/background.jpg" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default AuthLayout;
