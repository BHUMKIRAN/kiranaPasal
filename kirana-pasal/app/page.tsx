"use client";

import { useSelector, useDispatch } from 'react-redux'
import { increment , decrement , incrementByAmount} from '../redux/slice/counterslice'
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
  const [data, setData] = useState([]);

  //redux gobal 
  const count = useSelector((state) => state.counter.quantities)
  const dispatch = useDispatch()

  // Fetch products function
  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:4000/products");
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
      <div className="flex bg-gray-200 h-screen">
        {/* Sidebar */}
        <SideBarAll />       

        {/* Main Content */}
        <div className="flex-1 p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {data.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer bg-white border rounded-xl shadow-lg p-4 flex flex-col items-center hover:shadow-xl transition"
              >
                <h2 className="font-semibold text-center mb-2">
                  {item.Title}
                </h2>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="rounded-lg shadow-md mb-3"
                  src={item.Image || null}
                  alt={item.Title}
                  width={200}
                  height={200}
                  onClick={() => router.push(`/products/${item.id}`)}
                />

                <span className="font-bold text-green-600">
                  Price: ${item.Price}
                </span>
                <div className='flex justify-center gap-1 items-center'>
                       <button className="flex bg-blue-300 rounded full p-2 h-5 w-7 justify-center items-center hover:bg-green-600" aria-label="Increment value" 
                       onClick={() => dispatch(decrement(item.id))}>
                  -
                </button>
                <span>{count[item.id]}</span>
                <button className="flex bg-blue-300 rounded full p-1 h-5 w-7 justify-center items-center hover:bg-red-600" aria-label="Decrement value" 
                onClick={() => dispatch(increment(item.id))}>
                  +
                </button>
                </div>
               
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;