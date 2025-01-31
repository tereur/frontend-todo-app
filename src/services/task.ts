import { getAuthToken } from "../utils/auth";
import ROUTES from "../config/routes"; 

export const fetchTasks = async () => {
  const token = getAuthToken();
  const response = await fetch(ROUTES.TASKS.INDEX, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};

export const createTask = async (task: any) => {
    const token = getAuthToken();
    
    const formData = new FormData();
    formData.append("name", task.name);
    formData.append("description", task.description);
    formData.append("latitude", task.latitude || "");
    formData.append("longitude", task.longitude || "");
    
    if (task.selectedFile) {
      formData.append("image", task.selectedFile);
    }
  
    try {
      const response = await fetch(ROUTES.TASKS.STORE, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });
  
      return response.json();
    } catch (error) {
      console.error("Error uploading task:", error);
      throw error;
    }
  };
  
export const updateTask = async (taskId:number, FormData:any) => {
  const token = getAuthToken();
  const response = await fetch(ROUTES.TASKS.UPDATE(taskId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: FormData,
  });
  return response.json();
};

export const deleteTask = async (taskId:number) => {
  const token = getAuthToken();
  const response = await fetch(ROUTES.TASKS.DELETE(taskId), {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};
