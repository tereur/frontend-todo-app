
const API_BASE_URL = 'http://localhost:8000/api';


const ROUTES = {
  FICHIER:{
    IMAGE : "http://localhost:8000/",
  },
  AUTH: {
    LOGIN: `${API_BASE_URL}/login`,
    REGISTER: `${API_BASE_URL}/register`,
    LOGOUT: `${API_BASE_URL}/logout`,
  },
  TASKS: {
    INDEX: `${API_BASE_URL}/tasks`, 
    STORE: `${API_BASE_URL}/tasks`, 
    UPDATE: (taskId:number) => `${API_BASE_URL}/tasks/${taskId}`, 
    DELETE: (taskId:number) => `${API_BASE_URL}/tasks/${taskId}`, 
  }
};

export default ROUTES;
