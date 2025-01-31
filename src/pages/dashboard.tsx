import "../styles/globals.css";
import { useRouter } from "next/navigation";
import { logoutService } from "../services/auth";
import { getAuthToken, removeAuthToken } from "../utils/auth";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // Etat pour gérer le chargement

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true); 
    }
  }, [router]);

  const handleLogout = async () => {
    setLoading(true); // Active le chargement lors de la déconnexion
    const token = getAuthToken();
    try {
      await logoutService(token);
      removeAuthToken();
      router.push("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    } finally {
      setLoading(false); // Désactive le chargement une fois l'opération terminée
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className={`px-4 py-2 rounded hover:bg-red-600 
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500'}`} 
          disabled={loading} 
        >
          {loading ? (
            <span className="animate-spin">🔄</span> 
          ) : (
            'Logout'
          )}
        </button>
      </nav>

      <main className="p-8">
        <h2 className="text-2xl font-bold mb-4">Welcome to your Dashboard!</h2>
        <p className="text-gray-700">This is where your dashboard content goes.</p>
      </main>
    </div>
  );
};

export default DashboardPage;
