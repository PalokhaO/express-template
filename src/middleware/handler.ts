import { RequestHandler, Request, Response } from "express";
import { RequestError } from "../models/request-error";

export function handler<REQ extends Dict = Dict, RES = any> (handler: Handler<REQ, RES>): RequestHandler {
    return async (req: Request<REQ>, res, next) => {
        try {
            const result = await handler(req);
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
            res.json(error);
        }
    };
}

interface Dict { [key: string]: string; }
type Handler<REQ extends Dict, RES> = (req: Request<REQ>) => RES | Promise<RES>;