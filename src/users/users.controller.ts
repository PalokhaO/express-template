import { Router } from "express";
import { User } from "../models/user";
import { handler } from "../middleware/handler";

export const usersController = Router();

usersController.use('/me', handler<null, User>(req => {
    const result: User = {
        id: 1,
        name: 'John Doe'
    };
    // throw 'No user found!';
    // throw new Error('No user found!');
    // return null;
    return new Promise((resolve) => setTimeout(() => resolve(result), 1000));
    // return result;
}));