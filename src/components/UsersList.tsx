import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers, getUser, type User } from "../api/users";

type Props = {
  onSelect: (id: number) => void;
};

export default function UsersList({ onSelect }: Props) {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching, // true while a background refetch is happening
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) return <p className="text-blue-600">Loading users…</p>;
  if (isError) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return <p className="text-red-600">Error: {msg}</p>;
  }

  return (
    <div className="w-full max-w-3xl">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Users</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => refetch()}
            className="px-3 py-1 rounded border hover:bg-gray-50"
          >
            Refetch
          </button>
          {isFetching && <span className="text-sm">syncing…</span>}
        </div>
      </div>

      <ul className="bg-white rounded-xl shadow divide-y">
        {data?.map((u: User) => (
          <li
            key={u.id}
            className="p-3 hover:bg-gray-50 cursor-pointer"
            onClick={() => {
              // warm up the cache for the details query
              queryClient.prefetchQuery({ queryKey: ["user", u.id], queryFn: () => getUser(u.id) });
              onSelect(u.id);
            }}
          >
            <div className="font-medium">{u.name}</div>
            <div className="text-sm text-gray-600">
              {u.email} · {u.address.city} · {u.company.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}