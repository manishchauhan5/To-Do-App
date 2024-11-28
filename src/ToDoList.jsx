import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const ToDoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [task, setTask] = useState([]);

  // Input value
  const handleInputChange = (value) => {
    setInputValue(value);
  };

  // Add todo
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!inputValue) return;

    if (task.some((curTask) => curTask.text === inputValue)) {
      setInputValue("");
      return;
    }

    setTask((prevTask) => [
      ...prevTask,
      { text: inputValue, checked: false },
    ]);
    setInputValue("");
  };

  // Check todo
  const handleCheck = (index) => {
    setTask((prevTask) =>
      prevTask.map((curTask, curIndex) =>
        curIndex === index
          ? { ...curTask, checked: !curTask.checked }
          : curTask
      )
    );
  };

  // Delete todo
  const handleDelete = (index) => {
    const updatedTask = task.filter((_, curIndex) => curIndex !== index);
    setTask(updatedTask);
  };

  return (
    <>
      <section className="p-6 max-w-md mx-auto bg-gray-100 rounded-lg shadow-md">
        <header className="text-2xl font-bold text-center text-gray-800 mb-6">
          To Do App
        </header>
        <form onSubmit={handleFormSubmit}>
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Enter your to do"
              className="w-full px-4 py-2 mr-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <button
              type="submit"
              className="px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition w-32"
            >
              Add Task
            </button>
          </div>
          <div>
            <div className="text-gray-500 py-2">
              <ul>
                {task.map((curTask, index) => (
                  <li
                    key={index}
                    className="text-black flex justify-between p-2 my-1 rounded shadow-lg"
                  >
                    <div
                      className={`w-9/12 ${
                        curTask.checked ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {curTask.text}
                    </div>

                    <div className="w-1/5 flex justify-between">
                      <button onClick={() => handleCheck(index)}>
                        <FaCheckCircle
                          className={`${
                            curTask.checked
                              ? "text-gray-400"
                              : "text-green-500"
                          } text-2xl`}
                        />
                      </button>
                      <button onClick={() => handleDelete(index)}>
                        <MdDeleteForever className="text-red-500 text-2xl" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setTask([])}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Clear All
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default ToDoList;
