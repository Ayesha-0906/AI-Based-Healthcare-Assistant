import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { PORT, URI } from "./config.js";
import App from "./routes/routes.js";



// === 1 - CREATE SERVER ===
const server = express();

server.use(cors());
server.disable("x-powered-by"); //Reduce fingerprinting
server.use(cookieParser());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());



// === 2 - CONNECT DATABASE ===
mongoose.connect(URI)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

// === 4 - CONFIGURE ROUTES ===
// Connect Main route to server
server.use(App);



// === 5 - START UP SERVER ===
server.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);