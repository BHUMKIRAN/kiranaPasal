"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Header() {
  const router = useRouter()
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/cart")

      const totalQuantity = res.data.reduce((sum, item) => {
        return sum + Number(item.Quantity || 0)
      }, 0)
      console.log(res.data)
      setQuantity(totalQuantity)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])
 
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
        <nav className="flex gap-6 font-medium">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-6">
          {/* Cart */}
          <div className="relative cursor-pointer">
            <Link href="/cart" className="font-medium">
              Cart🛒
            </Link>

            <span
              className="absolute -top-2 -right-2 bg-red-600 text-white text-xs
              px-2 py-0.5 rounded-full"
            >
              {quantity}
            </span>
          </div>
        </div>
      </header>

      <div className="h-20"></div>
    </div>
  )
}