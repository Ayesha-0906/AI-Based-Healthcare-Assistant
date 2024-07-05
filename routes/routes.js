import express from "express"; // import the express module
import Auth from "./auth.js"; //import auth
import { Verify } from "../middleware/verify.js";
import path from "path";
import { fileURLToPath } from "url";
import { verify } from "crypto";

// Function to get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); // Create an app object

app.disable("x-powered-by"); // Reduce fingerprinting (optional)
// home route with the get method and a handler
app.use("/auth", Auth);

app.use(express.static("public"));

app.use("/user", Verify, express.static("dashboard"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

export default app;
