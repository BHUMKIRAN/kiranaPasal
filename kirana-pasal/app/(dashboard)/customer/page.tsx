"use client";

import Header from "@/components/header/page";
import SideBarAll from "@/components/sidebarall";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
}

const Home = () => {
  const router = useRouter();
  const [data, setData] = useState([]);

  // Fetch products function
  const fetchProducts = async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    setData(res.data);
  };

  //useEffect runs once on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {/* Header */}
      <Header />

      {/* Page Body */}
      <div className="flex bg-gray-200 h-screen pt-5">
        {/* Sidebar */}
        <SideBarAll />

        {/* Main Content */}
        <div className="flex-1 p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {data.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push(`/products/${item.id}`)}
                className="cursor-pointer bg-white border rounded-xl shadow-lg p-4 flex flex-col items-center hover:shadow-xl transition"
              >
                <h2 className="font-semibold text-center mb-2">
                  {item.title}
                </h2>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="rounded-lg shadow-md mb-3"
                  src={item.image}
                  alt={item.title}
                  width={200}
                  height={200}
                />

                <span className="font-bold text-green-600">
                  Price: ${item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
