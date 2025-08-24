import { useState } from "react";
import UsersList from "./components/UsersList";
import UserDetails from "./components/UserDetails";

export default function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto p-4">
          <h1 className="text-2xl font-bold">TanStack Query Mini Site</h1>
          <p className="text-gray-600">
            Fetching, caching, and syncing server state with TanStack Query.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4">
        <UsersList onSelect={(id) => setSelectedId(id)} />
      </main>

      {selectedId !== null && (
        <UserDetails id={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
}