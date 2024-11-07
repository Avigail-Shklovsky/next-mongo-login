import React from "react";
import LinkProps from "../types/link";
import { Button } from "./Button";

const navLinks: LinkProps[] = [
  { name: "Home", href: "/home" },
  { name: "Login", href: "/login" },
];

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between p-4 bg-green-600 text-white font-bold">
      My Website
      <div className="flex space-x-4 justify-evenly">
        {navLinks.map((link) => (
          <Button key={link.href} name={link.name} href={link.href} />
        ))}
      </div>
    </nav>
  );
};
export default Navbar;
