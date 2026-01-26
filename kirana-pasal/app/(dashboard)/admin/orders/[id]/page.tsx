"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function OrderDetails({ params }) {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error("Failed to fetch order", err);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-2">Order #{order.id}</h1>
      <p className="mb-1">Customer: {order.customerName}</p>
      <p className="mb-3">Status: {order.status}</p>

      <h2 className="font-semibold mb-2">Items</h2>
      {order.items.map((item, i) => (
        <div key={i} className="flex justify-between mb-1">
          <span>{item.name} x {item.qty}</span>
          <span>Rs {item.qty * item.price}</span>
        </div>
      ))}

      <p className="font-bold mt-3">Total: Rs {order.total}</p>
    </div>
  );
}
