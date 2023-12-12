/*
 
  @ Pushpendra
  Desc - Started Project
  Date - 05/12/23
 
 */

import express from "express";
import fileUpload from 'express-fileupload';
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes.mjs";
import * as dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

app.use('/uploads', express.static(join(__dirname, 'uploads'))); // For preview files from upload folder directly

// Always use routes in last
// Here in routes we have all our routing configurations
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log("Your backend is running on :", process.env.PORT)
});