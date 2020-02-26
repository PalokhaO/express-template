import passport = require("passport");
import { Strategy } from "passport-jwt";
import { Request } from "express";
import { getRepository } from "typeorm";
import { UserEntity } from "../models/user";

const cookieExtractor = function(req: Request) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};

passport.use(new Strategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: 'secret',
}, async (jwt_payload, done) => {
    const user = await getRepository(UserEntity).findOne(jwt_payload.sub);
    return done(null, user);
}));

export const jwtAuth = () => passport.authenticate('jwt', { session: false, });