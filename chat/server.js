// подключаем express
const express = require("express");

// создаем приложение express
const app = express();

// создаем сервер http
const server = require("http").Server(app);
// создаем сокеты
const io = require("socket.io")(server,{
    cors:{
        origin: "*",
    },
});

app.use(express.json());

const rooms = new Map();

app.get("/rooms", (req, res) => {
    res.json(rooms);
});
app.post("/rooms",(req,res) => {
    const {roomID, UserName} = req.body;
    if (!rooms.has(roomID)) {
        rooms.set(
            roomID,
            new Map([
            ["users", new Map()],
            ["messages", []],
            ])
        );
    }
    res.send();
});

io.on("connection", (socket) => {
    console.log("user connected", socket.id);
});

server.listen(9999, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log("Сервер запущен!");
});
