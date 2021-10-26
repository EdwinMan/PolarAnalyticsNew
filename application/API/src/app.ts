import express from "express";
import dotenv from "dotenv";

const cors = require('cors')
const Controller = require("./Controllers/Controller")

dotenv.config();
 
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

// Routing
app.use("/api", Controller)

app.listen(PORT, ()=> {
    console.log("Server is Up on Port: ", PORT);
})