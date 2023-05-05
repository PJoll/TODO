import React, { useEffect, useState } from "react";
import Nav from "./Nav";

function Main({ socket }){
    const [todo,setTodo]  = useState("");
    const [todoList, setTodoList] = useState([]);

    const generateID =() => Math.random().toString(36).substring(2,10);

    const handleAddTodo = (e) => {
        e.preventDeffault();
        socket.emit("addTodo",{
            id: generateID(),
            todo,
            comments: [],
        });
        setTodo("");
        useEffect(() => {
           function fetchTodos() {
            fetch("http://localhost:4000/api")
            .then((res) => res.json())
            .then((data) => setTodoList(data))
            .catch((err) => console.error(err));
           }
        }, [socket])
        
    };
    return(
        <div>
            <Nav />
            <form className='form' onSubmit={handleAddTodo}>
                <input
                value= {todo}
                onChange={(e) => setTodo(e.target.value)}
                className='input'
                required
                />
                <button className='form__cta'>ADD TODO</button>
            </form>
            <div className='todo__container'>
                {todoList.map((item) => (
                    <div className='todo__item' key={item.id}>
                        <p>{item.todo}</p>
                        <div>
                            <button className="commentsBtn">View Comment</button>
                            <button className="deleteBtn">DELETE</button>
                        </div>
                    </div>
                ))}
                   
                    </div>
                </div>
           
    );  
};

export default Main;