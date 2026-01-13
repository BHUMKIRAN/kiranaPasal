"use client";
import React, { useEffect, useState } from "react";

const Test = () => {
  const [data ,setdata] = useState([])

  const fetchData = async () => {
    const response = await fetch("https://fakestoreapi.com/users");
    setdata( await response.json())
    
  };
  useEffect(() => {
    fetchData();
  }, []);
console.log(data);
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};
export default Test;
