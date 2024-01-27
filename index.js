import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = process.env.PORT || 5600;

app.get("/", (req, res) => {
  res.send("<h1>Welcome To Blockchain Explorer</h1>");
});

app.listen(port, () => {
  console.log("Welcome To Blockchain Explorer..!");
});
