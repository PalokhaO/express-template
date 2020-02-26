import { RequestHandler, Response, Request } from "express";
import { RequestError } from "../models/request-error";
import { User } from "../models/user";

export function handler<REQ extends {} = Dict, RES = any> (handler: Handler<REQ, RES>): RequestHandler {
    return async (req: TypedRequest<REQ>, res, next) => {
        try {
            const result = await handler(req, res);
            if (result) {
                res.json(result);
            } else {
                res.send();
            }
        } catch (e) {
            console.error(e);
            const error: RequestError = {
                message: e.message || e || 'Unknown error',
            };
            res.statusCode = 400;
            res.json(error);
        }
    };
}

type Dict = Record<string,string>;
export interface TypedRequest<T> extends Request {
    body: T;
    user: User;
}
type Handler<REQ extends Dict, RES> = (req: TypedRequest<REQ>, res?: Response) => RES | Promise<RES>;