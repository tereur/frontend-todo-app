
export const setAuthToken = (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token); 
    }
  };
  
  export const getAuthToken = () => {
    
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token'); 
    }
    return null;
  };
  
  export const removeAuthToken = () => {
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  };
 