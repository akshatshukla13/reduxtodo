import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice"; // Assuming you have an updateTodo action

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [editText, setEditText] = useState(""); // State to hold edited text
  const [editId, setEditId] = useState(null); // State to hold id of todo being edited

  const handleEdit = (todo) => {
    setEditId(todo.id); // Set the id of the todo being edited
    setEditText(todo.text); // Set the current text of the todo in the input field
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateTodo({ id: editId, text: editText })); // Dispatch update action
    setEditId(null); // Clear edit mode
    setEditText(""); // Clear input field
  };

  const handleCancel = () => {
    setEditId(null); // Clear edit mode
    setEditText(""); // Clear input field
  };

  return (
    <>
      <div>Todos</div>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
          >
            {editId === todo.id ? (
              // Render input field when editing
              <form  className="flex items-center">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="text-white bg-transparent px-2 py-1 border-b border-white focus:outline-none"
                />
                <button
                onClick={handleUpdate}
                  type="submit"
                  className="text-white bg-blue-500 ml-2 border-0 py-1 px-4 focus:outline-none rounded text-md"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-white bg-gray-500 ml-2 border-0 py-1 px-4 focus:outline-none rounded text-md"
                >
                  Cancel
                </button>
              </form>
            ) : (
              // Render todo text when not editing
              <>
                <div className="text-white text-left">{todo.text}</div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => dispatch(removeTodo(todo.id))}
                    className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(todo)}
                    className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none rounded text-md"
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
