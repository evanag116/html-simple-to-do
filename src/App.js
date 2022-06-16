import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos((todos) => [...todos, todo]);
  };
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  };
  const udpateTodo = (id, text) => {};
  const removeTodo = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const [newText, setNewText] = useState("");

  return (
    <div className="App p-5">
      <h1 className="text-center">This is a TODO list</h1>
      <ul className="list-group container">
        {todos.map((todo) => (
          <li
            className="todo-item list-group-item d-flex justify-content-between align-items-center"
            key={todo.id}
          >
            <input
              type="checkbox"
              value={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.completed ? <s>{todo.text}</s> : todo.text}</span>
            <div>
              <i
                className="bi bi-trash mx-2"
                onClick={() => removeTodo(todo.id)}
              ></i>
              <i
                className="bi bi-pencil mx-2"
                onClick={() => removeTodo(todo.id)}
              ></i>
            </div>
          </li>
        ))}
      </ul>
      <form className="d-flex justify-content-center align-items-center m-4">
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
        <i
          className="bi bi-plus-circle m-2"
          onClick={() => {
            addTodo({
              id: todos.length + 1,
              text: newText,
              completed: false,
            });
            setNewText("");
          }}
        ></i>
      </form>
    </div>
  );
}

export default App;
