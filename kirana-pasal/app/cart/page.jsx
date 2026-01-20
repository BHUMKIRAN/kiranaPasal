"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
/**
 * @typedef {Object} CartItem
 * @property {number} id
 * @property {number} productId
 * @property {string} Title
 * @property {number} Price
 * @property {string} Image
 * @property {number} Quantity
 */

const CartPage = () => {
  const [cart, setCart] = useState([])
  const router = useRouter()
  const fetchCart = async () => {
    const { data } = await axios.get("http://localhost:4000/cart")
    setCart(data)
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const removeItem = async (id) => {
    await axios.delete(`http://localhost:4000/cart/${id}`)
    fetchCart()
  }

  const total = cart.reduce(
    (sum, item) =>
      sum += item.Price * item.Quantity,
    0
  )
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        <button type="button"  className="transition-all duration-300 hover:text-xl hover:text-green-600 "   
          onClick={() => router.back()}>Go Back</button>
      </div>


      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div className="space-y-6">
          {cart.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.Image}
                  className="w-20 h-20 object-contain"
                />
                <div>
                  <h2 className="font-semibold">{item.Title}</h2>
                  <p>${item.Price * item.Quantity}</p>
                </div>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}

          <h2 className="text-xl font-bold">
            Total: ${total}
          </h2>
        </div>
      )}
    </div>
  )
}

export default CartPage
