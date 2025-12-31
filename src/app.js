const express = require("express");
const { urlencoded } = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const indexRoute = require("./routes/index.js");
const requestIdMiddleware = require("./middlewares/requestId.middleware.js");

dotenv.config(); // it allow us to use .env varibales
const PORT = process.env.PORT || 8000;

const app = express(); // give access express application

app.use(cors()); // allow fronend to access server or make request
app.use(express.json()); // allow json data or payload sent from frontend side into req.body
app.use(urlencoded({ extended: true })); // allow form data into req.body

app.use(requestIdMiddleware);
// routes
app.use("/", indexRoute);

// server listening

app.listen(PORT, () => console.log("Server is running"));
