import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/users";

type Props = { id: number; onClose: () => void };

export default function UserDetails({ id, onClose }: Props) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1></h1>
            <h2 className="text-xl font-semibold text-white ml-10">User Profile</h2>
            <button 
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3"></div>
                <p className="text-gray-600">Loading user details...</p>
              </div>
            </div>
          )}

          {isError && (
            <div className="text-center py-8">
              <div className="text-red-500 text-4xl mb-3">⚠️</div>
              <p className="text-red-600 font-medium mb-2">Failed to load user</p>
              <p className="text-gray-500 text-sm">
                {(error as Error)?.message ?? "An error occurred"}
              </p>
            </div>
          )}

          {data && (
            <div className="space-y-6">
              {/* User Avatar & Basic Info */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {data.name.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{data.name}</h3>
                <p className="text-gray-600">User ID: {data.id}</p>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Information
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm w-16">Email:</span>
                    <span className="text-gray-900">{data.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm w-16">Phone:</span>
                    <span className="text-gray-900">{data.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm w-16">Website:</span>
                    <a 
                      href={`https://${data.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {data.website}
                    </a>
                  </div>
                </div>
              </div>

              {/* Company & Location */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Company & Location
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm w-16">Company:</span>
                    <span className="text-gray-900 font-medium">{data.company.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm w-16">City:</span>
                    <span className="text-gray-900">{data.address.city}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}