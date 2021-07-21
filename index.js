//Importing modules and defining ports
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:8080",
      "https://projectrehash.herokuapp.com/",
    ],
  },
});

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const itemRoute = require("./routes/items");
const categoryRoute = require("./routes/categories");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const reviewRoute = require("./routes/reviews");
const agreementRoute = require("./routes/agreements");
const groupRoute = require("./routes/groups");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");
const notificationRoute = require("./routes/notifications");
const multer = require("multer");
var cors = require("cors");
let port = process.env.PORT || 8080;
var path = require("path");

const User = require("./models/User");

//read from the .env file
dotenv.config();

//connect to database
mongoose
  .connect(
    "mongodb+srv://bingsen0806:testing123@rehash.3cwin.mongodb.net/rehash?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

/** TODO ADD groups path to production environment  **/

//setup for production environment
if (process.env.NODE_ENV === "production") {
  console.log("environment is production!");
  console.log("__dirname is: " + __dirname);
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
  });
  app.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
  });
  app.get("/home", function (req, res) {
    res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
  });
  app.get("/create", function (req, res) {
    res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
  });
  app.get("/product/*", function (req, res) {
    res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
  });
  app.get("/chat/*", function (req, res) {
    res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
  });
  app.get("/profile/*", function (req, res) {
    res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
  });
  app.get("/items/*", function (req, res) {
    res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
  });
}
app.use("/images", express.static(path.join(__dirname, "/public/images")));

//middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//uploading images with multer
const itemStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public/images/items"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const personStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public/images/person"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const itemUpload = multer({ storage: itemStorage });
app.post("/api/upload/items", itemUpload.array("file"), (req, res) => {
  try {
    var imageFileNames = [];
    for (let i = 0; i < req.files.length; i += 1) {
      console.log(
        `File ${req.files[i].filename} uploaded to ${req.files[i].path}`
      );
      imageFileNames.push("items/" + req.files[i].filename);
    }
    console.log(imageFileNames);
    return res.status(200).json({ imagePaths: imageFileNames });
  } catch (err) {
    console.log(err);
  }
});

const personUpload = multer({ storage: personStorage });
app.post("/api/upload/person", personUpload.single("file"), (req, res) => {
  try {
    const imageFileName = "person/" + req.file.filename;
    console.log(imageFileName);
    return res.status(200).json({ imagePath: imageFileName });
  } catch (err) {
    console.log(err);
  }
});

//routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/items", itemRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/items", itemRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/agreements", agreementRoute);
app.use("/api/groups", groupRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);
app.use("/api/notifications", notificationRoute);

//socket.io connections
let users = [];
var someoneGetUser = false;
var myInterval;

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

setInterval(function () {
  console.log("someoneGetUser is: ", someoneGetUser);
  if (!someoneGetUser) {
    myInterval = setInterval(function () {
      io.emit("getUsers", users);

      // console.log("the one sending getUsers now is: ", socket.id);
    }, 15000);
    someoneGetUser = true;
    console.log("myInterval changed!");
  }
}, 1000);

io.on("connection", (socket) => {
  //when a user connects
  console.log("a user connected");

  //utility functions
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

  const getUserBySocketId = (socketId) => {
    return users.find((user) => user.socketId === socketId);
  };

  const updateLastActive = async () => {
    const socketUser = await getUserBySocketId(socket.id);
    try {
      const user = await User.findById(socketUser.userId);
      const date = new Date();
      await user.updateOne({ lastActive: date });
      console.log("updatedLastActive");
    } catch (err) {
      console.log(err);
    }
  };

  //when "addUser" is called from frontend, take userId from frontend and add user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    updateLastActive();
    io.emit("getUsers", users); //tell all sockets with "getUsers" that a new user is added
    console.log(users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user) {
      console.log("emitting getMessage once!");
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });

  //when asked to updateLastActive
  socket.on("updateLastActive", () => {
    updateLastActive();
  });

  //when disconnect
  socket.on("disconnect", async () => {
    console.log("a user disconnected");
    if (myInterval) {
      clearInterval(myInterval);
      someoneGetUser = false;
    }
    updateLastActive();
    removeUser(socket.id);
    console.log(users);
    io.emit("getUsers", users); //tell everyone a user is removed
  });
});

server.listen(port, () => {
  console.log("Server listening on port: " + port);
});
