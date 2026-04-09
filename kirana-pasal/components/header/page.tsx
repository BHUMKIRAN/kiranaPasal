"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Hamburger } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);
  const { loggedIN, user } = useSelector((state: RootState) => state.auth);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:4000/cart");

      const totalQuantity = res.data.reduce(
        (sum: number, item: any) => sum + Number(item.Quantity || 0),
        0
      );

      setQuantity(totalQuantity);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (loggedIN) {
      fetchCart();
    }
  }, [loggedIN]);

  const handleLogout = () => {
    dispatch(logout());
    document.cookie = "kirana_auth=; path=/; max-age=0";
    router.push("/login");
  };

  return (
    <div className="relative">
      <header className="fixed top-0 left-0 bg-white right-0 z-50 flex items-center justify-between px-6 py-3 shadow-md bg-gradient-to-r">

        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <img
            src="/Logo.png"
            alt="Logo"
            className="rounded-full w-10 h-10 cursor-pointer"
            onClick={() => router.push("/")}
          />

          <strong
            className="text-lg uppercase tracking-[0.18em] cursor-pointer"
            onClick={() => router.push("/")}
          >
            Kirana Pasal
          </strong>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 font-medium text-white">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {loggedIN ? (
            <>
              <Link
                href="/cart"
                className="relative rounded-full bg-white/10 px-3 py-2 text-sm font-medium hover:bg-white/20"
              >
                Cart 🛒
                <span className="absolute -top-2 -right-3 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-rose-500 px-1 text-xs font-semibold text-white">
                  {quantity}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold hover:bg-emerald-600"
            >
              Login
            </Link>
          )}

          {loggedIN && user && (
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700">
                {user.name?.charAt(0) || "U"}
              </div>
              <span className="hidden sm:block">{user.name}</span>
            </div>
          )}
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </div>
  );
}