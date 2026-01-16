'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'


const ProductTable = () => {
    const [products, setproducts] = useState([])
    const Router = useRouter();

    const fetchProducts = async () => {
        const { data } = await axios.get(`http://localhost:4000/products`)
        setproducts(data)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

const handleDelete = async (id) => {
  if (!confirm("Are you sure want to delete ???")) return;

  try {
    await axios.delete(`http://localhost:4000/products/${id}`);

    // Update UI instantly
    setproducts((prev) => prev.filter((item) => item.id !== id));

  } catch (error) {
    console.error(error);
  }
};
     

    return (
        <div className="product-container">
            <button className="add-product-btn" onClick={() => Router.push('/admin/products/CreateProduct')}>
                Add Products
            </button>

            <table className="product-table">
                <thead className="product-thead">
                    <tr>
                        <th className="product-th">ID</th>
                        <th className="product-th">Product Name</th>
                        <th className="product-th">Image</th>
                        <th className="product-th">Price</th>
                        <th className="product-th">Category</th>
                        <th className="product-th text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((items, index) => (
                        <tr key={items.id || index} className="product-row">
                            <td className="product-td">{index + 1}</td>
                            <td className="product-td font-medium">{items.Title}</td>
                            <td className="product-td">
                                <img src={items.Image || null } className="product-image" />
                            </td>
                            <td className="product-td">Rs. {items.Price}</td>
                            <td className="product-td">
                                <span className="product-badge">{items.Category}</span>
                            </td>
                            <td className="product-td text-center space-x-2">

                            <button className="action-btn btn-view"
                            onClick={() => Router.push(`/admin/products/${items.id || index}/ViewProduct`)}
                            >View</button>

                            <button className="action-btn btn-edit"
                            onClick={()=>Router.push(`/admin/products/${items.id}/EditProduct`)}
                            >Edit</button>

                            <button className="action-btn btn-delete"
                            onClick={() => handleDelete(items.id)}>Delete</button>
                        </td>
                        </tr>
                    ))}
            </tbody>
        </table>
        </div >

    )
}

export default ProductTable