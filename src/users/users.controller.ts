import { Router } from "express";
import { User, UserEntity } from "../models/user";
import { handler } from "../middleware/handler";
import { getRepository } from "typeorm";

export const usersController = Router();

usersController.use('/me', handler<null, User>(async req => {
    const result: User = {
        id: 1,
        name: 'John Doe'
    };
    // const users = await getRepository(UserEntity).find();
    
    // throw 'No user found!';
    // throw new Error('No user found!');
    // return null;
    return result;
}));