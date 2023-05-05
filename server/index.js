const express = require("express");
const app = express();
const PORT = 4000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//👇🏻 New imports
const http = require("http").Server(app);
const cors = require("cors");
app.use(cors());
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});
let todoList = [];
//👇🏻 Add this before the app.get() block
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('addTodo', (todo) => {
        todoList.unshift(todo);
        socketIO.emit("todos", todoList);
    });
    socket.on("deleteTodo", (id) => {
        todoList = todoList.filter((todo) => todo.id !== id);
        socketIO.emit("todos", todoList);
    });
    socket.on("viewComments", (id) => {
        for (let i=0; i<todoList.length; i++) {
            if(id === todoList[i].id){
                socketIO.emit("commentsRecieved",todoList[i])
            }
        }
    });
    socket.on('disconnect', () => {
      socket.disconnect()
      console.log('🔥: A user disconnected');
    });
})
app.get("/api", (req, res) => {
    res.json(todoList)
});
http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});