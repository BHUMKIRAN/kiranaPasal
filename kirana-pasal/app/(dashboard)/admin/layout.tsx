import AdminSidebar from "@/components/adminsidebar";

export const metadata = {
  title: "Admin Panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <AdminSidebar />
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Admin Header */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>

          <div className="flex items-center gap-4">
            <button className="bg-gray-200 px-3 py-1 rounded">
              Notifications
            </button>
            <div className="bg-gray-200 px-3 py-1 rounded">Admin</div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="h-12 bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
          © 2026 Kirana Pasal Admin Panel
        </footer>
      </div>
    </div>
  );
}
