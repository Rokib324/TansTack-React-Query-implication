import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/users";

type Props = { id: number; onClose: () => void };

export default function UserDetails({ id, onClose }: Props) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: !!id, // don’t run until we have an id
  });

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">User Details</h3>
          <button onClick={onClose} className="px-3 py-1 rounded border">Close</button>
        </div>

        {isLoading && <p>Loading…</p>}
        {isError && (
          <p className="text-red-600">
            {(error as Error)?.message ?? "Error loading user"}
          </p>
        )}

        {data && (
          <div className="space-y-1">
            <div className="font-medium">{data.name}</div>
            <div className="text-sm">{data.email}</div>
            <div className="text-sm">{data.phone}</div>
            <div className="text-sm">{data.website}</div>
            <div className="text-sm">Company: {data.company.name}</div>
            <div className="text-sm">City: {data.address.city}</div>
          </div>
        )}
      </div>
    </div>
  );
}