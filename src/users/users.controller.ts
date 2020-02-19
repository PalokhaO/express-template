import { Router } from "express";
import { User } from "../models/user";

export const usersController = Router();

usersController.get('/me', (req, res) => {
    const result: User = {
        id: 1,
        name: 'John Doe'
    };
    res.json(result);
});