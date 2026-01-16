'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

const EditProduct = () => {
  const { id } = useParams()
  const router = useRouter()

  const productId = Array.isArray(id) ? id[0] : id

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!productId) return

    const fetchProduct = async () => {
      const { data } = await axios.get(
        `http://localhost:4000/products/${productId}`
      )

      setTitle(data.Title)
      setPrice(data.Price)
      setCategory(data.Category)
      setImage(data.Image)
      setLoading(false)
    }

    fetchProduct()
  }, [productId])

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios.patch(`http://localhost:4000/products/${productId}`, {
      Title: title,
      Price: price,
      Category: category,
      Image: image,
    })

    router.push('/admin/products')
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">
          Edit Product
        </h2>

        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => router.push('/admin/products')}
            className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProduct
