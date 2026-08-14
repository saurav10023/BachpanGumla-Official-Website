import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AlbumsPanel from "../components/admin/Albumspanel";
import NoticesPanel from "../components/admin/NoticesPanel";

const TABS = [
  { key: "albums", label: "Gallery" },
  { key: "notices", label: "Notices" },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("albums");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
            {user?.name && (
              <p className="text-sm text-gray-500">Signed in as {user.name}</p>
            )}
          </div>
          <button
            onClick={logout}
            className="text-sm font-medium text-gray-600 hover:text-fuchsia-800 transition-colors"
          >
            Log out
          </button>
        </div>
      </header>

      <nav className="max-w-5xl mx-auto px-6 pt-4">
        <div className="flex gap-2 border-b border-gray-200">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "border-fuchsia-800 text-fuchsia-800"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {activeTab === "albums" && <AlbumsPanel />}
        {activeTab === "notices" && <NoticesPanel />}
      </main>
    </div>
  );
}