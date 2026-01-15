'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'

const ViewProduct = () => {
    const params = useParams() // { id: '1', string }
    const router = useRouter()
    const [product, setProduct] = useState<any>(null)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // fetch all products
                const { data } = await axios.get('http://localhost:4000/products')
                // find product by string id
                const prod = data.find((p: any) => p.id === params.id)
                setProduct(prod)
            } catch (error) {
                console.error(error)
            }
        }

        fetchProduct()
    }, [params.id])

    if (!product) return <p>Loading...</p>

    return (
        <div className="max-w-3xl mx-auto border rounded shadow p-4 flex flex-col md:flex-row gap-6">

            {/* Left Column - Image + Back Button */}
            <div className="flex flex-col items-center md:w-1/2">
                {product.Image ? (
                    <img
                        src={product.Image}
                        alt={product.Title}
                        className="w-full h-64 md:h-80 object-cover rounded mb-4"
                    />
                ) : (
                    <div className="w-full h-64 md:h-80 bg-gray-200 flex items-center justify-center rounded mb-4 text-gray-500">
                        No Image
                    </div>
                )}

                <button
                    className="mt-2 px-4 py-2 bg-amber-500 border rounded-lg hover:bg-amber-800 text-white font-semibold"
                    onClick={() => router.back()}
                >
                    Back
                </button>
            </div>

            {/* Right Column - Product Info */}
            <div className="md:w-1/2 flex flex-col justify-center gap-2">
                <h1 className="text-3xl font-bold">{product.Title || 'No Title'}</h1>
                <p className="text-lg"><strong>Price:</strong> Rs. {product.Price || 'N/A'}</p>
                <p className="text-lg"><strong>Category:</strong> {product.Category || 'N/A'}</p>
            </div>

        </div>

    )
}

export default ViewProduct
