"use client";
import React, { useState } from "react";
import axios from "axios";
import ComponentProps from "../types/componentProps";
// import userStore, { UserState } from "../store/userStore";


export const ItemsInput: React.FC<ComponentProps> = ({
  type,
  prop1,
  prop2,
}) => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  // const getCurrentUser = userStore((state: UserState) => state.getCurrentUser);

  // const currentUser = getCurrentUser();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:3000/api/post${type}`,
        { [prop1]: input1, [prop2]: input2 },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("added new item successful");
      clearData();
    } catch (error: unknown) {
      console.log(error, "Account creation failed.");
    }
  };

  const clearData = () => {
    setInput1("");
    setInput2("");
  };

  return (
    <div className="border-green-600 border-2 p-8 ">
      <form onSubmit={onSubmit}>
        <p className="flex justify-center font-semibold">Add {type}:</p>
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="prop1" >
            {prop1[0].toUpperCase() + prop1.slice(1)}:
          </label>
          <input
            className="w-full border-2 border-gray-300 rounded-lg p-1 focus:border-green-600 focus:outline-none text-sm"
            required
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            id="prop1"
            type="text"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="prop2">
            {prop2[0].toUpperCase() + prop2.slice(1)}:
          </label>
          <input
            className="w-full border-2 border-gray-300 rounded-lg p-1 focus:border-green-600 focus:outline-none text-sm"
            required
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            id="prop2"
            type="text"
          />
        </div>
        <button className="w-full bg-green-600 text-white py-2 mt-4 rounded">
          Add
        </button>
      </form>
    </div>
  );
};
