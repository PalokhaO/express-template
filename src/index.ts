import express from 'express';
import cors from 'cors';
import { router } from './router';

const PORT = 5000;

const app = express();

app.use(cors());

app.use(router);

app.listen(PORT);