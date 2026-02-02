"use client";

import { RootState } from "@/redux/store";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Header() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(0);

  const { loggedIN, user } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/cart");

        const totalQuantity = res.data.reduce(
          (sum: number, item: any) =>
            sum + Number(item.Quantity || 0),
          0
        );

        setQuantity(totalQuantity);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
  console.log("Auth State:", { loggedIN, user });
  console.log("User Image:", user?.image);
}, [loggedIN, user]);

  return (
    <div className="relative">
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between
        px-6 py-3 shadow-md
        bg-gradient-to-r from-amber-200 via-red-200 to-pink-200 h-20"
      >
        {/* Logo */}
        <strong className="text-lg uppercase">
          <button onClick={() => router.push("/customer")}>
            kirana pasal
          </button>
        </strong>

        {/* Navigation */}
        <nav className="flex gap-6 font-medium items-center">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>

          <input
            type="text"
            name="search"
            placeholder="Search anything here..."
            className="border-2 border-amber-500 shadow-2xl rounded-3xl px-2 py-1
            transition-all duration-300 active:scale-105 hover:translate-x-5"
          />
        </nav>

        {/* Right */}
        <div className="flex items-center gap-6">
          {/* Cart */}
          <div className="relative cursor-pointer">
            <Link href="/cart" className="font-medium">
              Cart 🛒
            </Link>

            <span
              className="absolute -top-2 -right-2 bg-red-600 text-white text-xs
              px-2 py-0.5 rounded-full"
            >
              {quantity}
            </span>
          </div>

          {/* User */}
          <div>
            { user && (
              <div className="flex flex-col justify-center items-center gap-y-0">
                <div className="rounded-full h-8 w-8 bg-blue-600 text-white flex items-center justify-center cursor-pointer overflow-hidden font-bold uppercase">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt="user"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    user.name?.charAt(0)
                  )}
                </div>

                <h2 className="text-sm font-medium">
                  {user.name}
                </h2>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20"></div>
    </div>
  );
}
