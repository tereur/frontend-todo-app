import { useState, useEffect } from 'react';
import { createTask } from '../services/task';

const TaskForm = ({ onClose,onTaskCreated  }: any) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<string | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toString());
        setLongitude(position.coords.longitude.toString());
        setLoadingLocation(false);
      },
      () => {
        setLoadingLocation(false);
        alert("Unable to retrieve your location.");
      }
    );
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!latitude || !longitude) {
      alert("Location is required.");
      return;
    }

    const taskData = {
      name,
      description,
      latitude,
      longitude,
      selectedFile,
    };

    try {
        const newTask = await createTask(taskData); 
        onTaskCreated(newTask); 
        setSuccessMessage("Task created successfully!");
        setTimeout(() => setSuccessMessage(null), 3000);
        onClose();
    } catch (error) {
      alert("Failed to create task. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700">Create a New Task</h2>

      <div>
        <label className="block text-gray-600 font-medium mb-1">Task Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter task name"
          required
          className="input w-full border p-2 rounded-md focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block text-gray-600 font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          className="textarea w-full border p-2 rounded-md focus:ring focus:ring-blue-300"
        />
      </div>

      <div>
        <label className="block text-gray-600 font-medium mb-1">Image (optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
        />
      </div>

      {loadingLocation ? (
        <p className="text-blue-500">Fetching your location...</p>
      ) : (
        <p className="text-sm text-gray-500">
          {latitude && longitude
            ? `Location: ${latitude}, ${longitude}`
            : "Location not available"}
        </p>
      )}

      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow-md"
        >
          Create Task
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded shadow-md"
        >
          Close
        </button>
      </div>

      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg">
          {successMessage}
        </div>
      )}
    </form>
  );
};

export default TaskForm;
