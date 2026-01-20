"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"

interface Product {
  id: number
  Title: string
  Price: number
  Category: string
  Image: string
}

const Id = () => {
  const {id} = useParams()
  const [productDetail, setProductDetail] = useState(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  const fetchProductDetail = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `http://localhost:4000/products/${id}`
      )
      setProductDetail(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchProductDetail()
    }
  }, [id])

  const handleAddToCart = async () => {
    if (!productDetail) return

    try {
      // Check if product already exists in cart
      const { data: cartItems } = await axios.get(
        `http://localhost:4000/cart?productId=${productDetail.id}`
      )
    
      if (cartItems.length > 0) {
        // Increase quantity
        const cartItem = cartItems[0]
        await axios.patch(
          `http://localhost:4000/cart/${cartItem.id}`,
          {
            Quantity: cartItem.Quantity + 1
          }
        )
      } else {
        // Add new product
       await axios.post("http://localhost:4000/cart", {
          productId: productDetail.id,
          Title: productDetail.Title,
          Price: productDetail.Price,
          Image: productDetail.Image,
          Quantity: 1
        })
      }
      alert(`${productDetail.Title} is added to cart`)
    } catch (error) {
      console.error("Add to cart error:", error)
    }
  }

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>
  }

  if (!productDetail) {
    return <div className="text-center text-red-500">Product not found</div>
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
        Loading product details...
      </div>
    )
  }


return (
  <div className="min-h-screen bg-gray-100 py-10 px-4">
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
      <div className="flex flex-col md:flex-row gap-10">

        {/* Image Section */}
        <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-xl p-6">
          <img
            src={productDetail.Image}
            alt={productDetail.Title}
            className="max-h-[400px] object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Details Section */}
        <div className="flex-1">
          <span className="inline-block mb-3 px-3 py-1 text-sm rounded-full bg-gray-200 text-gray-700">
            {productDetail.Category}
          </span>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {productDetail.Title}
          </h1>

          <p className="text-2xl font-semibold text-green-600 mb-6">
            ${productDetail.Price}
          </p>

          <div className="flex gap-4">

            <button className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold transition"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            <button className="flex-1 border border-gray-300 hover:bg-gray-100 py-3 rounded-xl font-semibold transition">
              Buy Now
            </button>
            <button
              onClick={() => router.push("/customer")}
              className="bg-blue-500 rounded-lg w-25 text-white hover:bg-blue-700">
              Return Back
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}

export default Id
