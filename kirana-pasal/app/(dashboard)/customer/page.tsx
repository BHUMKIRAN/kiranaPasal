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
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({});

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/products");
      setData(res.data);

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

  const updateQty = (id: number, qty: number) => {
    setQuantities((prev) => ({ ...prev, [id]: qty }));
  };

  const placeOrder = async (product: Product) => {
    setLoading((prev) => ({ ...prev, [product.id]: true }));
    const qty = quantities[product.id] || 1;
    const order = {
      customerName: "Ram Sharma",
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

  const filteredProducts = data.filter((item) =>
    item.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <button
        type="button"
        onClick={() => setSidebarOpen((prev) => !prev)}
        className="fixed top-28 left-4 z-40 rounded-full bg-slate-900 px-4 py-3 text-white shadow-lg shadow-slate-900/25 transition hover:bg-slate-800"
      >
        ☰
      </button>

      <div className="flex">
        <SideBarAll isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div
          className={`flex-1 min-h-screen px-5 py-6 transition-all duration-300 ${
            sidebarOpen ? "md:ml-72" : "md:ml-0"
          }`}
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex justify-center">
              <div className="w-full max-w-2xl">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-3xl border border-slate-300 bg-white px-5 py-3 text-slate-900 shadow-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <h2 className="text-lg font-semibold mb-3 text-slate-800">{item.Title}</h2>

                  <img
                    className="mb-4 h-48 w-full rounded-3xl object-cover"
                    src={item.Image || undefined}
                    alt={item.Title}
                    width={200}
                    height={200}
                  />

                  <span className="mb-4 block text-slate-600">Price: ${item.Price}</span>

                  <div className="flex items-center gap-2 mb-4">
                    <button
                      onClick={() =>
                        updateQty(item.id, Math.max(1, (quantities[item.id] || 1) - 1))
                      }
                      className="rounded-full bg-slate-100 px-3 py-2 text-slate-700 hover:bg-slate-200"
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
                      className="w-16 rounded-2xl border border-slate-300 px-3 py-2 text-center text-slate-900"
                    />
                    <button
                      onClick={() =>
                        updateQty(item.id, (quantities[item.id] || 1) + 1)
                      }
                      className="rounded-full bg-slate-100 px-3 py-2 text-slate-700 hover:bg-slate-200"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => placeOrder(item)}
                    disabled={loading[item.id]}
                    className="w-full rounded-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading[item.id] ? "Placing..." : "Order Now"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
