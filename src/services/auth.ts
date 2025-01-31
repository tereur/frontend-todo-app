
import ROUTES from '../config/routes'; 

export const login = async (email: string, password: string) => {
  const response = await fetch(ROUTES.AUTH.LOGIN, {  
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json(); 
};

export const register = async (name: string,email: string, password: string) => {
  console.log({ name, email, password });
  const response = await fetch(ROUTES.AUTH.REGISTER, {  
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
  if (!response.ok) {
    throw new Error('Registration failed');
  }

  return response.json(); 
};

export async function logoutService(token: string | null) {
    if (!token) {
      throw new Error("Token manquant");
    }
  
    const response = await fetch(ROUTES.AUTH.LOGOUT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Erreur lors de la déconnexion");
    }
  
    return await response.json();
  }
  