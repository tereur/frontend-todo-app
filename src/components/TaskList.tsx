import { useEffect, useState } from 'react';
import { fetchTasks, deleteTask } from '../services/task';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedInUser, setIsLoggedInUser] = useState<boolean>(false);     

  
  const currentUser = { id: 1 }; 

  useEffect(() => {
    const loadTasks = async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
    };
    loadTasks();
  }, []);

  const handleDelete = async (taskId: number) => {
    await deleteTask(taskId);
    setTasks(tasks.filter((task: any) => task.id !== taskId));
  };

  const handleAddTaskClick = () => {
    setShowModal(true);
  };
  const handleTaskCreated = (newTask: any) => {
    setTasks([...tasks, newTask]); 
  };
  return (
    <div className="task-list space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Tasks</h1>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleAddTaskClick}
        >
          Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">Image</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task: any) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={handleDelete}
                isLoggedInUser={task.isMine} 
              />
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Task</h2>
            <TaskForm onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
