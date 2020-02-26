import { compareSync, hashSync } from "bcrypt";
import { Router } from "express";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";
import { handler } from "../middleware/handler";
import { jwtAuth } from "../middleware/jwt-auth";
import { Creds, User, UserEntity } from "../models/user";

export const usersController = Router();

usersController.post('/register', handler<User & Creds, void>(async req => {
    const user = await getRepository(UserEntity).findOne({
        login: req.body.login
    });
    if (user) {
        throw 'Login taken!';
    }

    const hashedUser = {
        ...req.body,
        hash: hashSync(req.body.password, 2),
    }

    const entity = await getRepository(UserEntity).create(hashedUser);
    await getRepository(UserEntity).save(entity);
}));

usersController.post('/login', handler<Creds, User>(async (req, res) => {
    const user = await getRepository(UserEntity).findOne({
        login: req.body.login
    }, {select: ['hash', 'id']});
    if (user && compareSync(req.body.password, user.hash)) {
        res.cookie('jwt', sign({
            sub: user.id
        }, 'secret'));
        return getRepository(UserEntity).findOne(user.id);
    } else {
        throw 'Invalid login or password!';
    }
}));

usersController.get('/me', jwtAuth(), handler<null, User>(async req => {
    return req.user;
}));