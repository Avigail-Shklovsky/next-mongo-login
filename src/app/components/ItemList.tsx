"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Item from "../types/itemT";

interface ItemsListProps<T> {
  type: string;
  prop1: keyof T;
  prop2: keyof T;
  // setKind: React.Dispatch<React.SetStateAction<string>>;
  // setItem: React.Dispatch<React.SetStateAction<Item<T>>>;
}

export const ItemsList = <T extends { [key: string]: string }>({
  type,
  prop1,
  prop2,

}: ItemsListProps<T>) => {
  const [items, setItems] = useState<Item<T>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/get${type}s`
        );

        if (response.data && response.data.status === 200) {
          const dataKey = `${type.toLowerCase()}s`;
          const itemsData = response.data[dataKey];
          if (Array.isArray(itemsData)) {
            setItems(itemsData);
          }
        } else {
          setError("Failed to fetch data.");
        }
      } catch (error: unknown) {
        setError("Error fetching data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);


  useEffect(() => {
    console.log("Updated items:", items);
  }, [items]);

  
  const handleUpdate = () => {

  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-48">
      <h1 className="font-bold">{`${
        type.charAt(0).toUpperCase() + type.slice(1)
      } List`}</h1>

<ul className="space-y-6 ">
  {items.length > 0 ? (
    items.map((item) => (
      <li
        key={item._id}
        className="p-4 bg-gray-100 rounded-md shadow-md flex items-center justify-between"
      >
        <div className="flex flex-col space-y-1">
        <div >
          <p className="text-sm  text-gray-700">{prop1 as string}: {item[prop1 as string]}</p>
          <p className="text-sm text-gray-500">{prop2 as string}: {item[prop2 as string]}</p>
        </div>
        <button
          onClick={() => handleUpdate()}
          className="ml-4 px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-md shadow hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Update
        </button>
        </div>
      </li>
    ))
  ) : (
    <p className="text-center text-gray-500">No items found.</p>
  )}
</ul>


    </div>
  );
};
