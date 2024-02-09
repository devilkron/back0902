require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notFound = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");
const authRoute = require("./routes/auth-route");
const todoRoute = require('./routes/todo-route')
const authenticate = require('./middlewares/authenticate')
const app = express();

app.use(cors());
app.use(express.json());

// service
app.use("/auth", authRoute);
app.use("/admin",authenticate, authRoute);
app.use("/guest", authRoute);
// app.use("/todos",todoRoute)

// notFound
app.use(notFound);

//Error
app.use(errorMiddleware);

let port = process.env.PORT || 8000;
app.listen(port, () => console.log("Server on Port:", port));
