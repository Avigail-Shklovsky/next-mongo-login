"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Item<T> {
  _id: string;
  [key: string]: T[keyof T] | string;
}

interface ItemsListProps<T> {
  type: string;
  prop1: keyof T; 
  prop2: keyof T; 
}


export const ItemsList = <T extends { [key: string]:string }>({
  type,
  prop1,
  prop2,
}: ItemsListProps<T>) => {
  const [items, setItems] = useState<Item<T>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
            setItems(itemsData);}
        } else {
          setError("Failed to fetch data.");
        }
      } catch (error: unknown) {
        setError("Error fetching data.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  useEffect(() => {
    console.log("Updated items:", items);
  }, [items]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="font-bold">{`${
        type.charAt(0).toUpperCase() + type.slice(1)
      } List`}</h1>

      <ul>
      {Array.isArray(items) && items.length > 0 ? (
  items.map((item) => (
    <li key={item._id}>
      <p><p>{item[prop1 as string]}</p> </p> 
      <p>{item[prop2 as string]}</p> 
    </li>
  ))
) : (
  <p>No items found.</p> // Fallback message when no items are found
)}
      </ul>
    </div>
  );
};
