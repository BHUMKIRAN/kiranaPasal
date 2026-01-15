'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const CreateProduct = () => {
    
    const [id , setId] = useState("")
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            
            await axios.post('http://localhost:4000/products', {
                Title: title,
                Image: image,
                Price: price,
                Category: category,
            })
            alert("Product Added Successfully")
            router.push('/admin/products')
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Add New Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                 <input
                    type="number"
                    placeholder="Id"
                    value={id || ""}
                    onChange={(e) => setId(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Product Title"
                    value={title || ""}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={image || ""}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price || ""}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category || ""}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Add Product
                </button>
                
            </form>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={()=>router.push('/admin/products')}>
                    Cancel
            </button>
        </div>
    )
}

export default CreateProduct