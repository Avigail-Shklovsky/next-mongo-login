import { ItemsList } from "@/app/components/ItemList";
import { ItemsInput } from "@/app/components/ItemsInput";

import React from "react";

const page = () => {
  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="flex justify-center items-center">
        <ItemsInput type={"Book"} prop1={"name"} prop2={"author"} />
      </div>
      <div className="flex justify-center items-center">
      <ItemsList type="Book" prop1="name" prop2="author" />
      </div>
    </div>
  );
};

export default page;
