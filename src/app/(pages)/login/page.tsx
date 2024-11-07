import React from "react";
import { LoginForm } from "../../components/LoginForm";

const login = () => {
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
        <div className=" rounded-lg shadow-lg w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </>
  );
};
export default login;
