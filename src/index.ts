import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { router } from './router';
import { connectToDb } from './typeorm';
import { join } from 'path';

const app = express();
app.use(cors({
    credentials: true,
    origin: true,
}));
app.use(json({
    type: ['text/plain', 'application/json'],
}));
app.use(cookieParser());
app.use(router);

// Serve static folder

// app.use(express.static(join(__dirname, './static')));
// app.get('*', (req, res) =>{
//     res.sendFile(join(__dirname, './static/index.html'));
// });

async function start() {
    await connectToDb();

    app.listen(process.env.PORT);
    console.log('App started successfully');
}

start();