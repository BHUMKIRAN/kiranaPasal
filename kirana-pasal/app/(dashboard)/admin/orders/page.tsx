"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:4000/orders");
      setOrders(res.data.reverse());
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status
  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:4000/orders/${id}`, { status });
      fetchOrders();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  // Delete an order with confirmation
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4000/orders/${id}`);
      alert("Order deleted successfully!");
      fetchOrders();
    } catch (err) {
      console.error("Failed to delete order", err);
      alert("Failed to delete order");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 && (
            <tr>
              <td colSpan="4" className="p-4 text-center">
                No orders found
              </td>
            </tr>
          )}

          {orders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">{order.customerName}</td>
              <td className="border p-2">
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="border px-2 py-1"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                </select>
              </td>
              <td className="border p-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleDelete(order.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="text-blue-600 underline"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
