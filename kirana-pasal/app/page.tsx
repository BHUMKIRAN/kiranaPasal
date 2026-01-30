"use client";

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../lib/features/box/boxSlice";
import Header from "@/components/header/page";
import SideBarAll from "@/components/sidebarall";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  Title: string;
  Image: string;
  Price: number;
  Category: string;
}

const Home = () => {
  const router = useRouter();
  const [data, setData] = useState<Product[]>([]);

  // redux global
  const count = useSelector((state: any) => state.counter.quantities);
  const dispatch = useDispatch();

  // Fetch products
  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:4000/products");
    setData(res.data);
  };

  // Place order
  const handleOrder = async (item: Product) => {
    const qty = count[item.id] || 0;

    if (qty === 0) {
      alert("Please add quantity first");
      return;
    }

    const order = {
      customerName: "LoginCustomerName",
      items: [
        {
          productId: item.id,
          name: item.Title,
          qty,
          price: item.Price,
        },
      ],
      total: qty * item.Price,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    await axios.post("http://localhost:4000/orders", order);
    alert(`Order for ${item.Title} placed successfully!`);
  };

  // Run once
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Header />

      <div className="flex bg-gray-200 h-screen">
        <SideBarAll />

        <div className="flex-1 p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {data.map((item) => (
              <div
                key={item.id}
                className="bg-white border rounded-xl shadow-lg p-4 flex flex-col items-center"
              >
                <h2 className="font-semibold mb-2">{item.Title}</h2>

                <img
                  src={item.Image}
                  alt={item.Title}
                  width={200}
                  height={200}
                  className="mb-3 cursor-pointer"
                  onClick={() => router.push(`/products/${item.id}`)}
                />

                <span className="font-bold text-green-600">
                  Price: ${item.Price}
                </span>

                <div className="flex gap-2 items-center mt-2">
                  <button
                    onClick={() => dispatch(decrement(item.id))}
                    className="bg-blue-300 px-2 rounded"
                  >
                    -
                  </button>

                  <span>{count[item.id] || 0}</span>

                  <button
                    onClick={() => dispatch(increment(item.id))}
                    className="bg-blue-300 px-2 rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleOrder(item)}
                  className="bg-emerald-500 mt-3 px-4 py-1 rounded text-white"
                >
                  Order
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
