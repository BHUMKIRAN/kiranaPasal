"use client"; // ⚠️ Required in App Router for client-side interactivity

import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", path: "/dashboard/admin" },
    { name: "Products", path: "/dashboard/admin/products" },
    { name: "Orders", path: "/dashboard/admin/orders" },
    { name: "Users", path: "/dashboard/admin/users" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">Kirana Admin</div>
      <nav className="flex-1 p-4">
        {menu.map((item) => (
          <Link key={item.name} href={item.path}>    
            <span
              className={`block py-2 px-4 rounded mb-2 hover:bg-gray-700 ${
                pathname === item.path ? "bg-gray-700" : ""
              }`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
