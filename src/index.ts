import express from 'express';
import cors from 'cors';
import { connectToDb } from './typeorm';
import { router } from './router';

const PORT = 5000;

const app = express();
app.use(cors());
app.use(router);

async function start() {
    // await connectToDb();

    app.listen(PORT);
    console.log('App started successfully');
}

start();