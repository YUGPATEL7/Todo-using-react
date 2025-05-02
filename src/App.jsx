import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./assets/componets/Navbar";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinised, setshowFinised] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isComlpeted: false }]);
    setTodo("");
    saveToLS();
  };
  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };
  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  const toogleshow = (e) => {
    setshowFinised(!showFinised)
   }; 

   return (
    <div className="container mx-auto bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl my-5 p-6 min-h-[80vh] shadow-lg border border-violet-200 transition-all duration-300 hover:shadow-xl">
      <div className="add my-3 bg-white p-5 rounded-xl shadow-md flex flex-col md:flex-row md:items-center gap-4">
        <div className="font-extrabold text-xl text-violet-900 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-10 after:h-1 after:bg-violet-500 after:rounded-full">
          Add a Todo
        </div>

        <input
          onChange={handleChange}
          value={todo}
          type="text"
          className="w-full md:w-1/2 bg-white rounded-lg p-3 border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all duration-200"
          placeholder="What are you planning?"
        />
        <button
          onClick={handleAdd}
          disabled={todo.length <= 3}
          id="round"
          className="bg-violet-700 rounded-lg hover:bg-violet-800 disabled:bg-violet-400 p-3 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:shadow-md hover:translate-y-[-2px] active:translate-y-0 disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          Save
        </button>
      </div>

      <div className="flex items-center mb-4 space-x-2 mt-3">
        <input
          onChange={toogleshow}
          type="checkbox"
          checked={showFinised}
          className="w-5 h-5 text-violet-600 rounded border-gray-300 focus:ring-violet-500 transition-colors duration-200"
        />
        <span className="text-gray-700 font-medium">Show Finished</span>
      </div>

      <div className="font-extrabold text-xl text-violet-900 mb-4 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-10 after:h-1 after:bg-violet-500 after:rounded-full">
        Your Todos
      </div>

      {todos.length <= 0 ? (
        <div className="flex items-center justify-center text-xl cursor-pointer transition duration-300 text-gray-500 hover:text-violet-700 p-10 bg-white rounded-xl border-2 border-dashed border-gray-300 hover:border-violet-400">
          No plans to display here
        </div>
      ) : (
        todos
          .filter((item) => (showFinised ? true : !item.isCompleted))
          .map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between my-3 bg-white p-4 rounded-lg shadow-sm border-l-4 border-l-violet-500 hover:shadow-md transition-all duration-200 hover:translate-y-[-2px] animate-[fadeIn_0.3s_ease-out_forwards]"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name={item.id}
                  checked={item.isCompleted}
                  onChange={handleCheckbox}
                  className="w-5 h-5 text-violet-600 rounded border-gray-300 focus:ring-violet-500 transition-colors duration-200"
                />
                <div className={`ml-3 ${item.isCompleted ? "line-through text-gray-400" : "text-gray-800"}`}>
                  {item.todo}
                </div>
              </div>
              <div className="flex space-x-2 gap-3 ">
                <button
                  onClick={(e) => {
                    handleEdit(e, item.id)
                  }}
                  id="round"
                  className="bg-violet-700 rounded-lg hover:bg-violet-800 p-2 px-4 text-sm font-bold text-white transition-all duration-200 hover:shadow-md"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    handleDelete(e, item.id)
                  }}
                  id="round"
                  className="bg-violet-700 rounded-lg hover:bg-violet-800 p-2 px-4 text-sm font-bold text-white transition-all duration-200 hover:shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
      )}
    </div>
  )
}
export default App;
