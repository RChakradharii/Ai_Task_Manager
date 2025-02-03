// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// // import "./TaskManager.css";

// // const TaskManager = () => {
// //     const [tasks, setTasks] = useState([]);
// //     const [description, setDescription] = useState('');
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState(null);
// //     const [theme, setTheme] = useState(localStorage.getItem("theme") || "light"); // Dark mode state

// //     // Toggle Dark Mode
// //     const toggleTheme = () => {
// //         const newTheme = theme === "light" ? "dark" : "light";
// //         setTheme(newTheme);
// //         document.documentElement.setAttribute("data-theme", newTheme);
// //         localStorage.setItem("theme", newTheme);
// //     };

// //     // Apply saved theme on load
// //     useEffect(() => {
// //         document.documentElement.setAttribute("data-theme", theme);
// //     }, [theme]);

// //     // Fetch Tasks and Sort by Priority
// //     const fetchTasks = async () => {
// //         setLoading(true);
// //         try {
// //             const response = await axios.get('https://ai-task-manager-cupj.onrender.com/tasks');
// //             const sortedTasks = response.data.sort((a, b) => {
// //                 const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };
// //                 return priorityOrder[a.priority] - priorityOrder[b.priority];
// //             });
// //             setTasks(sortedTasks);
// //         } catch (error) {
// //             setError("Failed to fetch tasks. Please check the server.");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     // Add Task
// //     const addTask = async () => {
// //         if (!description) return;
// //         setLoading(true);
// //         try {
// //             const response = await axios.post('https://ai-task-manager-cupj.onrender.com/tasks', { description });
// //             setTasks([...tasks, response.data].sort((a, b) => {
// //                 const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };
// //                 return priorityOrder[a.priority] - priorityOrder[b.priority];
// //             }));
// //             setDescription('');
// //         } catch (error) {
// //             setError("Failed to add task.");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     // Update Task
// //     const updateTask = async (id, newDescription) => {
// //         if (!newDescription) return;
// //         setLoading(true);
// //         try {
// //             const response = await axios.put(`https://ai-task-manager-cupj.onrender.com/tasks/${id}`, { description: newDescription });
            
// //             // Update the task in the local state without re-fetching
// //             setTasks(prevTasks => 
// //                 prevTasks.map(task => 
// //                     task._id === id ? { ...task, description: newDescription, priority: response.data.priority } : task
// //                 )
// //             );
// //         } catch (error) {
// //             setError("Failed to update task.");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     // Delete Task
// //     const deleteTask = async (id) => {
// //         setLoading(true);
// //         try {
// //             await axios.delete(`https://ai-task-manager-cupj.onrender.com/tasks/${id}`);
// //             setTasks(tasks.filter(task => task._id !== id));
// //         } catch (error) {
// //             setError("Failed to delete task.");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     // Handle Drag & Drop
// //     const onDragEnd = (result) => {
// //         if (!result.destination) return;
// //         const reorderedTasks = Array.from(tasks);
// //         const [movedTask] = reorderedTasks.splice(result.source.index, 1);
// //         reorderedTasks.splice(result.destination.index, 0, movedTask);
// //         setTasks(reorderedTasks);
// //     };

// //     useEffect(() => {
// //         fetchTasks();
// //     }, []);

// //     return (
// //         <div className="task-manager">
// //             <h1>Task Manager</h1>

// //             {/* Dark Mode Toggle Button */}
// //             <button className="theme-toggle" onClick={toggleTheme}>
// //                 {theme === "light" ? "🌙" : "☀️"}
// //             </button>

// //             {error && <p className="error">{error}</p>}

// //             <input
// //                 type="text"
// //                 value={description}
// //                 onChange={(e) => setDescription(e.target.value)}
// //                 placeholder="Add a new task"
// //                 className="task-input"
// //             />
// //             <button onClick={addTask} disabled={loading} className="task-button">
// //                 {loading ? "Adding..." : "Add Task"}
// //             </button>

// //             {/* Drag and Drop Context */}
// //             <DragDropContext onDragEnd={onDragEnd}>
// //                 <Droppable droppableId="tasks">
// //                     {(provided) => (
// //                         <ul {...provided.droppableProps} ref={provided.innerRef} className="task-list">
// //                             {tasks.map((task, index) => (
// //                                 <Draggable key={task._id} draggableId={task._id} index={index}>
// //                                     {(provided) => (
// //                                         <li
// //                                             ref={provided.innerRef}
// //                                             {...provided.draggableProps}
// //                                             {...provided.dragHandleProps}
// //                                             className="task-item"
// //                                         >
// //                                             <span className={`priority-${task.priority.toLowerCase()}`}>
// //                                                 {task.description} - <strong>{task.priority}</strong>
// //                                             </span>

// //                                             <div>
// //                                                 <button onClick={() => updateTask(task._id, prompt('Update task:', task.description))} className="edit-button">Edit</button>
// //                                                 <button onClick={() => deleteTask(task._id)} className="delete-button">Delete</button>
// //                                             </div>
// //                                         </li>
// //                                     )}
// //                                 </Draggable>
// //                             ))}
// //                             {provided.placeholder}
// //                         </ul>
// //                     )}
// //                 </Droppable>
// //             </DragDropContext>
// //         </div>
// //     );
// // };

// // export default TaskManager;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import "./TaskManager.css";

// const TaskManager = () => {
//     const [tasks, setTasks] = useState([]);
//     const [description, setDescription] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [theme, setTheme] = useState(localStorage.getItem("theme") || "light"); // Dark mode state

//     // Toggle Dark Mode
//     const toggleTheme = () => {
//         const newTheme = theme === "light" ? "dark" : "light";
//         setTheme(newTheme);
//         document.documentElement.setAttribute("data-theme", newTheme);
//         localStorage.setItem("theme", newTheme);
//     };

//     // Apply saved theme on load
//     useEffect(() => {
//         document.documentElement.setAttribute("data-theme", theme);
//     }, [theme]);

//     // Fetch Tasks and Sort by Priority
//     const fetchTasks = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get('https://ai-task-manager-cupj.onrender.com/tasks');
//             const sortedTasks = response.data.sort((a, b) => {
//                 const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };
//                 return priorityOrder[a.priority] - priorityOrder[b.priority];
//             });
//             setTasks(sortedTasks);
//         } catch (error) {
//             setError("Failed to fetch tasks. Please check the server.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Add Task
//     const addTask = async () => {
//         if (!description) return;
//         setLoading(true);
//         try {
//             const response = await axios.post('https://ai-task-manager-cupj.onrender.com/tasks', { description });
//             const newTask = response.data;
//             setTasks(prevTasks => [...prevTasks, newTask].sort((a, b) => {
//                 const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };
//                 return priorityOrder[a.priority] - priorityOrder[b.priority];
//             }));
//             setDescription('');
//         } catch (error) {
//             setError("Failed to add task.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Update Task
//     const updateTask = async (id, newDescription) => {
//         if (!newDescription) return;
//         setLoading(true);
//         try {
//             const response = await axios.put(`https://ai-task-manager-cupj.onrender.com/tasks/${id}`, { description: newDescription });
//             setTasks(prevTasks => prevTasks.map(task => 
//                 task._id === id ? { ...task, description: newDescription, priority: response.data.priority } : task
//             ));
//         } catch (error) {
//             setError("Failed to update task.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Delete Task
//     const deleteTask = async (id) => {
//         setLoading(true);
//         try {
//             await axios.delete(`https://ai-task-manager-cupj.onrender.com/tasks/${id}`);
//             setTasks(tasks.filter(task => task._id !== id));
//         } catch (error) {
//             setError("Failed to delete task.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Handle Drag & Drop
//     const onDragEnd = (result) => {
//         if (!result.destination) return;
//         const reorderedTasks = Array.from(tasks);
//         const [movedTask] = reorderedTasks.splice(result.source.index, 1);
//         reorderedTasks.splice(result.destination.index, 0, movedTask);
//         setTasks(reorderedTasks);
//     };

//     useEffect(() => {
//         fetchTasks();
//     }, []);

//     return (
//         <div className="task-manager">
//             <h1>Task Manager</h1>

//             {/* Dark Mode Toggle Button */}
//             <button className="theme-toggle" onClick={toggleTheme}>
//                 {theme === "light" ? "🌙" : "☀️"}
//             </button>

//             {error && <p className="error">{error}</p>}

//             <input
//                 type="text"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Add a new task"
//                 className="task-input"
//             />
//             <button onClick={addTask} disabled={loading} className="task-button">
//                 {loading ? "Adding..." : "Add Task"}
//             </button>

//             {/* Drag and Drop Context */}
//             <DragDropContext onDragEnd={onDragEnd}>
//                 <Droppable droppableId="tasks">
//                     {(provided) => (
//                         <ul {...provided.droppableProps} ref={provided.innerRef} className="task-list">
//                             {tasks.map((task, index) => (
//                                 <Draggable key={task._id} draggableId={task._id} index={index}>
//                                     {(provided) => (
//                                         <li
//                                             ref={provided.innerRef}
//                                             {...provided.draggableProps}
//                                             {...provided.dragHandleProps}
//                                             className="task-item"
//                                         >
//                                             <span className={`priority-${task.priority.toLowerCase()}`}>
//                                                 {task.description} - <strong>{task.priority}</strong>
//                                             </span>

//                                             <div>
//                                                 <button 
//                                                     onClick={() => updateTask(task._id, prompt('Update task:', task.description))} 
//                                                     className="edit-button">
//                                                     Edit
//                                                 </button>
//                                                 <button onClick={() => deleteTask(task._id)} className="delete-button">Delete</button>
//                                             </div>

//                                             {/* Display Subtasks */}
//                                             {task.subtasks && task.subtasks.length > 0 && (
//                                                 <ul>
//                                                     {task.subtasks.map((subtask, subIndex) => (
//                                                         <li key={subIndex}>{subtask}</li>
//                                                     ))}
//                                                 </ul>
//                                             )}
//                                         </li>
//                                     )}
//                                 </Draggable>
//                             ))}
//                             {provided.placeholder}
//                         </ul>
//                     )}
//                 </Droppable>
//             </DragDropContext>
//         </div>
//     );
// };

// export default TaskManager;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./TaskManager.css";

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [editTaskId, setEditTaskId] = useState(null); // Store editing task ID
    const [editDescription, setEditDescription] = useState(''); // Store editing task description

    // Toggle Dark Mode
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    // Apply saved theme on load
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    // Fetch Tasks and Sort by Priority
    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://ai-task-manager-cupj.onrender.com/tasks');
            const sortedTasks = response.data.sort((a, b) => {
                const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            });
            setTasks(sortedTasks);
        } catch (error) {
            setError("Failed to fetch tasks. Please check the server.");
        } finally {
            setLoading(false);
        }
    };

    // Add Task
    const addTask = async () => {
        if (!description) return;
        setLoading(true);
        try {
            const response = await axios.post('https://ai-task-manager-cupj.onrender.com/tasks', { description });
            const newTask = response.data;
            setTasks(prevTasks => [...prevTasks, newTask].sort((a, b) => {
                const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }));
            setDescription('');
        } catch (error) {
            setError("Failed to add task.");
        } finally {
            setLoading(false);
        }
    };

    // Update Task
    const updateTask = async (id, newDescription) => {
        if (!newDescription) return;
        setLoading(true);
        try {
            const response = await axios.put(`https://ai-task-manager-cupj.onrender.com/tasks/${id}`, { description: newDescription });
            setTasks(prevTasks => prevTasks.map(task => 
                task._id === id ? { ...task, description: newDescription, priority: response.data.priority } : task
            ));
        } catch (error) {
            setError("Failed to update task.");
        } finally {
            setLoading(false);
        }
    };

    // Delete Task
    const deleteTask = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`https://ai-task-manager-cupj.onrender.com/tasks/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            setError("Failed to delete task.");
        } finally {
            setLoading(false);
        }
    };

    // Handle Drag & Drop
    const onDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedTasks = Array.from(tasks);
        const [movedTask] = reorderedTasks.splice(result.source.index, 1);
        reorderedTasks.splice(result.destination.index, 0, movedTask);
        setTasks(reorderedTasks);
    };

    // Handle Task Edit Mode
    const handleEditTask = (task) => {
        setEditTaskId(task._id);
        setEditDescription(task.description);
    };

    const handleSaveEdit = async () => {
        if (editDescription.trim() === '') return;
        try {
            await updateTask(editTaskId, editDescription);
            setEditTaskId(null);
            setEditDescription('');
        } catch (error) {
            setError("Failed to update task.");
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="task-manager">
            <h1>Task Manager</h1>

            {/* Dark Mode Toggle Button */}
            <button className="theme-toggle" onClick={toggleTheme}>
                {theme === "light" ? "🌙" : "☀️"}
            </button>

            {error && <p className="error">{error}</p>}

            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a new task"
                className="task-input"
            />
            <button onClick={addTask} disabled={loading} className="task-button">
                {loading ? "Adding..." : "Add Task"}
            </button>

            {/* Drag and Drop Context */}
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="tasks">
                    {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef} className="task-list">
                            {tasks.map((task, index) => (
                                <Draggable key={task._id} draggableId={task._id} index={index}>
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="task-item"
                                        >
                                            <span className={`priority-${task.priority.toLowerCase()}`}>
                                                {task.description} - <strong>{task.priority}</strong>
                                            </span>

                                            <div>
                                                {editTaskId === task._id ? (
                                                    <div>
                                                        <input
                                                            type="text"
                                                            value={editDescription}
                                                            onChange={(e) => setEditDescription(e.target.value)}
                                                            placeholder="Update task"
                                                        />
                                                        <button onClick={handleSaveEdit}>Save</button>
                                                    </div>
                                                ) : (
                                                    <button onClick={() => handleEditTask(task)} className="edit-button">
                                                        Edit
                                                    </button>
                                                )}
                                                <button onClick={() => deleteTask(task._id)} className="delete-button">Delete</button>
                                            </div>

                                            {/* Display Subtasks */}
                                            {task.subtasks && task.subtasks.length > 0 && (
                                                <ul>
                                                    {task.subtasks.map((subtask, subIndex) => (
                                                        <li key={subIndex}>{subtask}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default TaskManager;
