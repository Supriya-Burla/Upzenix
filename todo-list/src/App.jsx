import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editPriority, setEditPriority] = useState('medium');
  const [editDueDate, setEditDueDate] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      const task = { id: Date.now(), text: newTask.trim(), completed: false, priority, dueDate: dueDate || null };
      setTasks([...tasks, task]);
      setNewTask('');
      setPriority('medium');
      setDueDate('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEdit = (id, text, priority, dueDate) => {
    setEditingId(id);
    setEditText(text);
    setEditPriority(priority);
    setEditDueDate(dueDate || '');
  };

  const saveEdit = () => {
    if (editText.trim()) {
      setTasks(tasks.map(task =>
        task.id === editingId ? { ...task, text: editText.trim(), priority: editPriority, dueDate: editDueDate || null } : task
      ));
    }
    setEditingId(null);
    setEditText('');
    setEditPriority('medium');
    setEditDueDate('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
    setEditPriority('medium');
    setEditDueDate('');
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const exportTasks = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'todo-tasks.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importTasks = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedTasks = JSON.parse(e.target.result);
          setTasks(importedTasks);
        } catch (error) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && !tasks.find(t => t.dueDate === dueDate)?.completed;
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || (filter === 'active' && !task.completed) || (filter === 'completed' && task.completed);
    const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <button className="dark-mode-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
      <h1>Todo List</h1>
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="due-date-input"
        />
        <button onClick={addTask}>➕ Add</button>
      </div>
      <div className="search">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tasks..."
        />
      </div>
      <div className="filters">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
        <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>Active</button>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
      </div>
      <div className="actions">
        <button onClick={clearCompleted} className="clear-btn">🗑️ Clear Completed</button>
        <button onClick={exportTasks} className="export-btn">📤 Export</button>
        <label className="import-btn">
          📥 Import
          <input type="file" accept=".json" onChange={importTasks} style={{ display: 'none' }} />
        </label>
      </div>
      <ul className="task-list">
        {filteredTasks.length === 0 ? (
          <li className="no-tasks">No Tasks</li>
        ) : (
          filteredTasks.map(task => (
            <li key={task.id} className={`task ${task.completed ? 'completed' : ''} priority-${task.priority} ${isOverdue(task.dueDate) ? 'overdue' : ''}`}>
              {editingId === task.id ? (
                <div className="edit-task">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                  />
                  <select value={editPriority} onChange={(e) => setEditPriority(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <input
                    type="date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                    className="due-date-input"
                  />
                  <button onClick={saveEdit} title="Save">💾</button>
                  <button onClick={cancelEdit} title="Cancel">❌</button>
                </div>
              ) : (
                <div className="task-content">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                    className="task-checkbox"
                  />
                  <span className="priority-indicator" title={`Priority: ${task.priority}`}></span>
                  <span className="task-text">
                    {task.text}
                  </span>
                  {task.dueDate && (
                    <span className={`due-date ${isOverdue(task.dueDate) ? 'overdue-text' : ''}`}>
                      📅 {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                  <div className="task-buttons">
                    <button onClick={() => startEdit(task.id, task.text, task.priority, task.dueDate)} title="Edit">✏️</button>
                    <button onClick={() => deleteTask(task.id)} title="Delete">🗑️</button>
                  </div>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;