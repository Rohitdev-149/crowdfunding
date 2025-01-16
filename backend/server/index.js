
import dotenv from "dotenv";                  
import connectDB from "./databaseConnection/connectDb.js";
import app from '../src/app.js'
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");



dotenv.config({
  path: "./.env",
});

const app = express();

app.use(express.json());
// app.use("/api/v1/users", userRouter);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Service is running on :${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error while connecting MongoDB", error);
  });