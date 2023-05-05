import React, { useEffect, useState } from "react";
import Nav from "./Nav";

function Main({ socket }){
    const [todo,setTodo]  = useState("");
    const [todoList, setTodoList] = useState([]);
    const [Modal , setModal] = useState(false);

    const toggleModal = (itemId) => {
        socket.emit("viewComments" , itemId);
        setSelectedItemId(itemId);
        setShowModal(!showModal);
    }
    
    const generateID =() => Math.random().toString(36).substring(2,10);

    const handleAddTodo = (e) => {
        e.preventDeffault();
        socket.emit("addTodo",{
            id: generateID(),
            todo,
            comments: [],
        });
        setTodo("");
    }
        useEffect(() => {
           function fetchTodos() {
            fetch("http://localhost:4000/api")
            .then((res) => res.json())
            .then((data) => setTodoList(data))
            .catch((err) => console.error(err));
           }
        }, [socket])
        
        const deleteTodo = (id) => socket.emit("deleteTodo", id);
    
        return (
            <div>
                ...
                <div className="todo__container">
                    {todoList.map((item) => (
                        <div className="todo__item" key={item.id}>
                            <p>{item.todo}</p>
                            <div>
                                <button className="commentsBtn" onClick={toggleModal}>View Comment</button>
                                <button className="deleteBtn" onClick={()=> deleteTodo(item.id)}>DELETE</button>
                            </div>
                        </div>
                    ))}
                </div>
                {showModal ? (
                    <Modal showModal={showModal} setShowModal={setShowModal} />
                ) : (
                    ""
                )}
            </div>
        );
                }

export default Main;