import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();


// middlewares
app.use(express.json({limit: '16kb'}));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
})); // to allow requests from the client

app.use(express.urlencoded({extended: true, limit: '16kb'})); // to parse form data
app.use(express.static('public')); // to serve static files 

app.use(cookieParser()); // to parse cookies



export default app;