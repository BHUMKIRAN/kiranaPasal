"use client";

import Header from "@/components/header/page";
import SideBarAll from "@/components/sidebarall";
import axios from "axios";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  Title: string;
  Image: string;
  Price: number;
  Category: string;
}

const Home = () => {
  const [data, setData] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({});

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/products");
      setData(res.data);

      // Initialize quantity = 1 for each product
      const initialQty: { [key: number]: number } = {};
      res.data.forEach((p: Product) => (initialQty[p.id] = 1));
      setQuantities(initialQty);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Update quantity for a product
  const updateQty = (id: number, qty: number) => {
    setQuantities((prev) => ({ ...prev, [id]: qty }));
  };

  // Place order function
  const placeOrder = async (product: Product) => {
    setLoading((prev) => ({ ...prev, [product.id]: true }));
    const qty = quantities[product.id] || 1;
    const order = {
      customerName: "Ram Sharma", // replace with dynamic user
      items: [{ name: product.Title, qty, price: product.Price }],
      total: qty * product.Price,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:4000/orders", order);
      alert(`Order for ${product.Title} placed successfully!`);
    } catch (err) {
      console.error("Failed to place order", err);
      alert("Failed to place order");
    } finally {
      setLoading((prev) => ({ ...prev, [product.id]: false }));
    }
  };

  return (
    <div>
      <Header />

      <div className="flex bg-gray-200 h-screen">
        <SideBarAll />

        <div className="flex-1 p-5 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {data.map((item) => (
              <div
                key={item.id}
                className="bg-white border rounded-xl shadow-lg p-4 flex flex-col items-center hover:shadow-xl transition"
              >
                <h2 className="font-semibold text-center mb-2">{item.Title}</h2>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="rounded-lg shadow-md mb-3"
                  src={item.Image || undefined}
                  alt={item.Title}
                  width={200}
                  height={200}
                />

                <span className="font-bold text-green-600 mb-2">
                  Price: ${item.Price}
                </span>

                {/* Quantity Selector */}
                <div className="flex items-center gap-2 mb-2">
                  <button
                    onClick={() =>
                      updateQty(item.id, Math.max(1, (quantities[item.id] || 1) - 1))
                    }
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={quantities[item.id] || 1}
                    onChange={(e) =>
                      updateQty(item.id, Math.max(1, Number(e.target.value)))
                    }
                    className="w-12 text-center border rounded"
                  />
                  <button
                    onClick={() =>
                      updateQty(item.id, (quantities[item.id] || 1) + 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                {/* Order Button */}
                <button
                  onClick={() => placeOrder(item)}
                  disabled={loading[item.id]}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                >
                  {loading[item.id] ? "Placing..." : "Order Now"}
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
