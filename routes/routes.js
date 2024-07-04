import express from "express"; // import the express module
import Auth from "./auth.js" //import auth
import { Verify } from "../middleware/verify.js";


const app = express(); // Create an app object


app.disable("x-powered-by"); // Reduce fingerprinting (optional)
// home route with the get method and a handler
app.use('/auth',Auth)

app.use(express.static("public"));


app.get("/user", Verify, (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to the your Dashboard!",
    });
});

app.get("/", (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            data: [],
            message: "Welcome to our API homepage!",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
});



export default app;