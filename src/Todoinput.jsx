// import React from 'react'
// import { useState } from 'react'
// import { FaArrowDown } from "react-icons/fa";
// import { MdDeleteForever } from "react-icons/md";
// import { FaEdit } from "react-icons/fa";



// const Todoinput = () => {
//     const [todo, setTodo] = useState("");
//     const [todos, setTodos] = useState([]);

//     const handleAdd = () =>{
//         setTodos([...todos, {todo, isCompleted: false}]);
//         setTodos("");
//     }

//     const handleEdit = () =>{

//     }

//     const handleDelete = () =>{

//     }


//   return (
//     <>
//     <div className="pt-8">

//         <form className="bg-slate-300 md:mx-72 mx-36 rounded-2xl">

//         <h1 className="text-center text-4xl text-blue-500 font-semibold py-6 ">To-Do-List</h1>
//       <div className="input-container flex justify-center pb-5">
//         <input type="text" placeholder="Enter your to-do" className="add-input border-2 border-slate-500 h-10 w-72 rounded-l-xl text-center"/>
//         <button onSubmit={handleAdd} type="submit" className="add-btn border-2 border-slate-500 w-24 h-10 rounded-r-xl">Add Task</button>
//       </div>

//       <div className="list-container">

//        <div className="flex justify-center pb-5">
//         <h1 className=" text-lg text-green-600 text-center ">Your ToDo</h1>
//        <FaArrowDown className="mt-1 ml-1 text-xl text-red-500"/>
//        </div>
       
//        <div className="flex justify-between bg-sky-300 px-6 py-2">
//        <div  className="text">{todo}</div>
//        <div className>
//         <button onClick={handleEdit} className=" px-2 rounded h-6"><FaEdit className="text-green-500 text-2xl"/></button>
//         <button onClick={handleDelete} className=" ml-2 px-2 rounded h-6"><MdDeleteForever className="text-red-500 text-2xl" />
//         </button>
//        </div>
//        </div>

//       </div>
//       </form>
//     </div>
    
    
//     </>
//   );
// }

// export default Todoinput






import React, { useState, useRef } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState([]); // To store the list of tasks
  const [newTask, setNewTask] = useState(''); // To store the value of the new task input
  const [editIndex, setEditIndex] = useState(null); // To track the index of the task being edited
  const [editText, setEditText] = useState(''); // To store the new text for the task being edited
  const inputRef = useRef(null); // Reference for the new task input field

  // Add a new task to the list
  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask(''); // Clear the input after adding
      inputRef.current.focus(); // Focus the input field after adding a task
    }
  };

  // Toggle the completed status of a task
  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Delete a task from the list
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Start editing a task
  const startEditing = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text); // Pre-fill the input with the current task text
  };

  // Save the edited task
  const saveEdit = () => {
    if (editText.trim() !== '') {
      const updatedTasks = tasks.map((task, i) =>
        i === editIndex ? { ...task, text: editText } : task
      );
      setTasks(updatedTasks);
      setEditIndex(null); // Reset editing state
      setEditText(''); // Clear the edit input
      inputRef.current.focus(); // Focus the new task input field after saving edit
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditIndex(null);
    setEditText('');
    inputRef.current.focus(); // Focus the new task input field after canceling edit
  };

  // Handle Enter key press to add a new task
  const handleAddKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  // Handle Enter key press to save an edited task
  const handleEditKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">To-Do List</h1>

      <div className="flex items-center mb-4">
        <input
          type="text"
          ref={inputRef} // Set reference to the input field
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleAddKeyPress} // Add Enter key detection for adding
          placeholder="Add a new task"
          className="w-full px-4 py-2 mr-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`flex items-center justify-between p-3 border rounded-lg ${
              task.completed ? 'bg-gray-200 line-through text-gray-500' : 'bg-white'
            }`}
          >
            {editIndex === index ? (
              <div className="flex items-center w-full">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={handleEditKeyPress} // Add Enter key detection for editing
                  className="flex-grow px-2 py-1 border border-gray-300 rounded mr-2 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={saveEdit}
                  className="px-2 py-1 bg-green-500 text-white rounded mr-2 hover:bg-green-600 transition"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="px-2 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span
                  onClick={() => toggleTaskCompletion(index)}
                  className="cursor-pointer flex-grow"
                >
                  {task.text}
                </span>
                <button
                  onClick={() => startEditing(index)}
                  className="px-2 py-1 text-blue-500 hover:text-blue-700 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="px-2 py-1 text-red-500 hover:text-red-700 transition"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
