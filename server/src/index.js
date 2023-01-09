'use strict';
import express from 'express';
import path from "path";
import http from "http";
import bodyParser from "body-parser";
import {router as temperatureRouter} from "./routes/temperature-controller.js";
import {config} from "dotenv";
import {fileURLToPath} from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const server = http.createServer(app);

config({path: path.resolve(__dirname, 'environments', 'development.env')});
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use('/api', temperatureRouter);

// app.use(bodyParser.urlencoded({
// 	extended: false
// }));

server.listen(port, () => console.log(`API running on http://localhost:${port}`));
