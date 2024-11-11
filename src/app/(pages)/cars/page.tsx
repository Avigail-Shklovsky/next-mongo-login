import { ItemsList } from "@/app/components/ItemList";
import { ItemsInput } from "@/app/components/ItemsInput";
import React from "react";

const page = () => {
  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="flex justify-center items-center">
        <ItemsInput type={"Car"} prop1={"model"} prop2={"year"}></ItemsInput>
      </div>
      <div className="flex justify-center items-center">
        <ItemsList type="Car" prop1="model" prop2="year" />
      </div>
    </div>
  );
};
export default page;
