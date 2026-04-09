"use client";

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/slices/counterSlice";
import Header from "@/components/header/page";
import SideBarAll from "@/components/sidebarall";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface Product {
  id: number;
  Title: string;
  Image: string;
  Price: number;
  Category: string;
}

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [data, setData] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const itemsPerPage = 10;
  const count = useSelector((state: any) => state.counter.quantities);

  // detect screen
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleHamburger = () => {
    if (isMobile) {
      setMenuOpen(!menuOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/products");
      setData(res.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

    try {
      await axios.post("http://localhost:4000/orders", order);
      alert(`Order for ${item.Title} placed successfully!`);
    } catch (error) {
      console.error("Order failed", error);
    }
  };

  // Search
  const filteredProducts = useMemo(
    () =>
      data.filter((item) =>
        item.Title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [data, searchQuery]
  );

  // Pagination
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      {/* Sidebar for desktop */}
      <SideBarAll
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div
        className={`px-5 pt-6 transition-all duration-300 ${
          sidebarOpen ? "md:ml-72" : ""
        }`}
      >
        <div className="mx-auto max-w-6xl">

          {/* Hamburger + Search */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={handleHamburger}
              className={`rounded-lg bg-slate-900 text-white px-4 py-2 ${sidebarOpen ? "hidden" : ""}`}
            >
              ☰
            </button>

            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search products..."
              className="flex-1 rounded-3xl border border-slate-300 bg-white px-5 py-3 shadow-sm"
            />
          </div>

          {/* Mobile dropdown menu */}
          {menuOpen && isMobile && (
            <div className="mb-6 rounded-xl bg-white shadow-md p-4 flex flex-col gap-2">
              <button onClick={() => router.push("/")}>Home</button>
              <button onClick={() => router.push("/products")}>Products</button>
              <button onClick={() => router.push("/about")}>About</button>
              <button onClick={() => router.push("/contact")}>Contact</button>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="rounded-3xl border border-dashed bg-white p-10 text-center">
              No products found matching "{searchQuery}".
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {paginatedData.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-3xl border bg-white p-5 shadow-sm"
                  >
                    <h2 className="text-lg font-semibold mb-3">
                      {item.Title}
                    </h2>

                    <img
                      src={item.Image}
                      className="mb-4 h-48 w-full object-cover rounded-3xl cursor-pointer"
                      onClick={() => router.push(`/products/${item.id}`)}
                    />

                    <p className="mb-4">Price: ${item.Price}</p>

                    <div className="flex justify-between mb-4">
                      <button onClick={() => dispatch(decrement(item.id))}>
                        -
                      </button>

                      <span>{count[item.id] || 0}</span>

                      <button onClick={() => dispatch(increment(item.id))}>
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleOrder(item)}
                      className="w-full bg-slate-900 text-white py-2 rounded"
                    >
                      Order
                    </button>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8 gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="px-4 py-2 bg-slate-200 rounded"
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded ${
                      currentPage === index + 1
                        ? "bg-slate-900 text-white"
                        : "bg-slate-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="px-4 py-2 bg-slate-200 rounded"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;