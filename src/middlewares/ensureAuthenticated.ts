import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"

export function ensureAuthenticated(request: Request, response: Response, next:NextFunction){

    const authToken = request.headers.authorization;

    if(!authToken){
        return response.status(401).json({
            message: "token is missing"
        })
    }

    // Bear
    const [, token] = authToken.split(" ");

    try {
        verify(token, "a73eb9d2-be65-428b-9a9b-6cafb1987156");

        return next();
    }catch(err){
        return response.status(401).json({
            message: "Token invalid"
        })
    }
}

