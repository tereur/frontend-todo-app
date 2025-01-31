import { useState } from 'react';
import { updateTask } from '../services/task';
import ROUTES from '../config/routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskItem = ({ task, onDelete, isLoggedInUser }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskName, setTaskName] = useState(task.name);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [taskImage, setTaskImage] = useState(task.image || '');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setTaskImage(URL.createObjectURL(file));
    }
  };

  const handleEdit = async () => {
    const formData = new FormData();
    formData.append('name', taskName);
    formData.append('description', taskDescription);
    formData.append('latitude', task.latitude || '');
    formData.append('longitude', task.longitude || '');
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      await updateTask(task.id, formData);
      toast.success('Task updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update task. Please try again.');
      console.error('Error updating task:', error);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <tr className="border-b">
        <td className="py-2 px-4">
          {task.image ? (
            <img src={ROUTES.FICHIER.IMAGE + task.image} alt="Task" className="w-16 h-16 object-cover" />
          ) : (
            <span>No Image</span>
          )}
        </td>
        <td className="py-2 px-4">{task.name}</td>
        <td className="py-2 px-4">{task.description}</td>
        <td className="py-2 px-4">
          {isLoggedInUser && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="bg-red-500 text-white py-1 px-2 rounded"
              >
                Delete
              </button>
            </>
          )}
        </td>
      </tr>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Edit Task</h2>
            <input
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Task Name"
              className="input w-full mb-3 p-2 border rounded"
            />
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Task Description"
              className="textarea w-full p-2 border rounded mb-3"
            />
            <label className="block mb-2">Task Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4"
            />
            {taskImage && (
              <img src={taskImage} alt="Preview" className="w-32 h-32 object-cover mb-4" />
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-80 p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-red-600">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this task?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDelete(task.id);
                  setShowDeleteModal(false);
                  toast.success('Task deleted successfully!');
                }}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskItem;
