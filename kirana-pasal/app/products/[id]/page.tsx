"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "next/navigation"

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

const Id = () => {
  const params = useParams()
  const [productDetail, setProductDetail] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProductDetail = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/${params.id}`
      )
      setProductDetail(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params?.id) {
      fetchProductDetail()
    }
  }, [params?.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
        Loading product details...
      </div>
    )
  }

  if (!productDetail) {
    return (
      <div className="text-center text-red-500 mt-20">
        Product not found
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
              src={productDetail.image}
              alt={productDetail.title}
              className="max-h-[400px] object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Details Section */}
          <div className="flex-1">
            <span className="inline-block mb-3 px-3 py-1 text-sm rounded-full bg-gray-200 text-gray-700">
              {productDetail.category}
            </span>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {productDetail.title}
            </h1>

            <p className="text-2xl font-semibold text-green-600 mb-6">
              ${productDetail.price}
            </p>

            <p className="text-gray-600 leading-relaxed mb-8">
              {productDetail.description}
            </p>

            <div className="flex gap-4">
              <button className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold transition">
                Add to Cart
              </button>

              <button className="flex-1 border border-gray-300 hover:bg-gray-100 py-3 rounded-xl font-semibold transition">
                Buy Now
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Id
