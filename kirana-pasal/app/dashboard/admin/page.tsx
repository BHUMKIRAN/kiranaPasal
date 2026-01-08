export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome to Kirana Pasal Admin</h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">Total Products: 120</div>
        <div className="bg-white p-4 rounded shadow">Total Orders: 45</div>
        <div className="bg-white p-4 rounded shadow">Total Users: 30</div>
        <div className="bg-white p-4 rounded shadow">Revenue: $5000</div>
      </div>
    </div>
  );
}
