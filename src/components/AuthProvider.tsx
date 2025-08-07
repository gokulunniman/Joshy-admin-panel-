import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";

interface AuthProviderProps {
  children: ReactNode;
}

// This component ensures auth state is initialized before rendering children
export default function AuthProvider({ children }: AuthProviderProps) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}