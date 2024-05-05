const express = require("express");
const mongoose = require("mongoose");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;

const authRoute = require("./routes/authRoutes");
const boardRoute = require("./routes/boardRoutes");
const userRoute = require("./routes/userRoutes");

const { verifyAuthHeaderAndRole } = require("./middlewares/authMiddlewares");
const Roles = require("./constants/Roles");

const server = http.createServer(app);

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));


// socket code section to support socket event, 
// Todo: refactor in future
let elements = [];

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user connected");
  io.to(socket.id).emit("whiteboard-state", elements);

  socket.on("element-update", (elementData) => {
    updateElementInElements(elementData);

    socket.broadcast.emit("element-update", elementData);
  });

  socket.on("whiteboard-clear", () => {
    elements = [];
    socket.broadcast.emit("whiteboard-clear");
  })

  socket.on("cursor-position", (cursorData) => {
    socket.broadcast.emit("cursor-position", {
      ...cursorData,
      userId: socket.id
    })
  })

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", socket.id)
  })
});

const updateElementInElements = (elementData) => {
  const index = elements.findIndex((element) => element.id === elementData.id);

  if (index === -1) return elements.push(elementData);

  elements[index] = elementData;
};

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello server is working");
});

app.use("/", authRoute);
app.use("/board", boardRoute) // Todo: Authentication to be added after Auth Implementation on UI side: verifyAuthHeaderAndRole([Roles.USER]),
app.use("/user", userRoute)

/*
  Testing route for authentication header
*/
app.post("/test", verifyAuthHeaderAndRole([Roles.USER]), async (req, res) => {
  return res.json({ message: 'success'});
})

server.listen(PORT, () => {
  console.log("server is running on port", PORT);
});