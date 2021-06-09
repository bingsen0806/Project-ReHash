//Importing modules and defining ports
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const itemRoute = require("./routes/item");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
var cors = require("cors");
let port = process.env.PORT || 8080;
var path = require("path");

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

//setup for production environment
if (process.env.NODE_ENV === "production ") {
  app.use(express.static(path.join(__dirname, "frontend/build")));

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
  });
}
app.use("/images", express.static(path.join(__dirname, "/public/images")));

//middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/items", itemRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.listen(port, () => {
  console.log("Server listening on port: " + port);
});
