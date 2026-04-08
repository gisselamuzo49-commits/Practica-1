import React, { useEffect, useState } from "react";
import { API } from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const getTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    await API.post("/tasks", { title, completed: false });
    setTitle("");
    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <h1>Tasks</h1>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={addTask}>Agregar</button>

      <ul>
        {tasks.map(t => (
          <li key={t._id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;