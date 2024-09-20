import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { app } from '../../config/firebaseConfig.js';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState(''); 
    const [editId, setEditId] = useState(null); 
    const navigate = useNavigate();
    const db = getFirestore(app);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/');
            }
        });
        fetchTodos();

        return () => unsubscribe();
    }, [navigate]);

    const fetchTodos = async () => {
        const snapshot = await getDocs(collection(db, "todos"));
        const todoList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTodos(todoList); 
    };

    const handleAddOrUpdate = async () => {
        if (!input.trim()) {
            alert("Please enter a valid todo");
            return;
        }

        if (editId) {
            const todoRef = doc(db, "todos", editId);
            await updateDoc(todoRef, { todo: input });
            setTodos(todos.map(todo => todo.id === editId ? { ...todo, todo: input } : todo));
            setEditId(null); 
            alert("Todo updated!");
        } else {
            const docRef = await addDoc(collection(db, "todos"), { todo: input });
            setTodos([...todos, { id: docRef.id, todo: input }]);
            alert("Todo added!");
        }

        setInput(''); 
    };

    // Delete a todo
    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "todos", id));
        setTodos(todos.filter(todo => todo.id !== id)); 
        alert("Todo deleted");
    };

    const handleEdit = (todo) => {
        setInput(todo.todo); 
        setEditId(todo.id); 
    };

    const logout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            alert("Logout successful");
        }).catch((error) => {
            console.log("Logout error: ", error);
        });
    };

    return (
        <div>
            <div className='navbar px-5'>
                <h1>Todo App</h1>
                <button onClick={logout} className='btn btn-danger'>Logout</button>
            </div>

            <div className='main-div'>
                <div className='todo-input'>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='Enter your todo'
                    />
                    <button onClick={handleAddOrUpdate}>
                        {editId ? 'Update Todo' : 'Add Todo'}
                    </button>
                </div>

                <div className='todo-list'>
                    <ul>
                        {todos.map(todo => (
                            <li key={todo.id} className='todo-item'>
                                <span>{todo.todo}</span>
                                <div>
                                    <button onClick={() => handleEdit(todo)} className='btn btn-primary'>Edit</button>
                                    <button onClick={() => handleDelete(todo.id)} className='btn btn-danger'>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;
