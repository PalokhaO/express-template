import { Router } from "express";
import { helloController } from "./hello/hello.controller";
import { usersController } from "./users/users.controller";

export const router = Router();

router.use('/hello', helloController);
router.use('/users', usersController);