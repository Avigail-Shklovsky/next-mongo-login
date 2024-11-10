"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import userStore, { UserState } from "../store/userStore";

export const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const getCurrentUser = userStore((state: UserState) => state.getCurrentUser);
  const setUser = userStore((state: UserState) => state.setUser);
  const currentUser = getCurrentUser();


  const toggleMenu = () => {
    if (currentUser) console.log(currentUser.username[0]);

    setIsOpen((prev) => !prev);
  };

  const handleClick = () => {
    if (currentUser) {
      setUser({ username: "", email: "", password: "" });
      console.log("Logging out...");
    } else {
      console.log("Redirecting to login...");
    }
    setIsOpen((prev) => !prev);
    router.push("/login");
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div
        onClick={toggleMenu}
        className="cursor-pointer w-12 h-12 flex justify-center items-center rounded-full bg-gray-300"
        style={{ backgroundColor: currentUser ? "#ccc" : "transparent" }}
      >
        {currentUser ? (
          <span className="text-black font-bold">
            {currentUser.username[0]}
          </span>
        ) : (
          <Image
            src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
            alt="profile"
            width={50}
            height={50}
            style={{ borderRadius: "50%" }}
          />
        )}
      </div>

      {isOpen && (
        <div className="absolute top-[110%] left-1/2 transform -translate-x-1/2 bg-white border border-[#ccc] rounded-md p-2 shadow-lg z-10 w-[70px]">
          <div
            className="p-2 cursor-pointer text-black text-sm"
            onClick={handleClick}
          >
            {currentUser ? "Logout" : "Login"}
          </div>
        </div>
      )}
    </div>
  );
};
