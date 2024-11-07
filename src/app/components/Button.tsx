import React from 'react';
import Link from 'next/link';

interface LinkProps {
  name: string;
  href: string;
}

export const Button: React.FC<LinkProps> = ({ name, href }) => {
  return (
    <Link href={href} className="hover:text-black">
    {name} 
    </Link>
  );
};
