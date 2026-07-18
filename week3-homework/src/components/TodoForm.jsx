import { useState } from "react";

function TodoForm({ addTodo }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.trim()) {
      alert("Please enter a task.");
      return;
    }

    addTodo(task);
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Enter a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

<button type="submit">Add Task</button>    </form>
  );
}

export default TodoForm;