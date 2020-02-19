import { Router } from "express";

export const helloController = Router();

helloController.get('', (req, res) => {
    res.send('Hello World!');
});