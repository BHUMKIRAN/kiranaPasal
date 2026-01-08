import AdminSidebar from "@/components/adminsidebar";
import Header from "@/components/header/page";

export const metadata = {
  title: "Admin Panel",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Header/>
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="w-full h-16 bg-white shadow flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-gray-200 px-3 py-1 rounded">Notifications</button>
            <div className="bg-gray-200 px-3 py-1 rounded">Admin</div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-auto">{children}</main>

        {/* Footer */}
        <footer className="w-full h-12 bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
          © 2026 Kirana Pasal Admin Panel
        </footer>
      </div>
    </div>
  );
}
