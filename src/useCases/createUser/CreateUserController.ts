import { Request, Response } from "express";
import {CreateUSerUseCase} from "./CreateUserUseCase"

class CreateUserController {
    async handle( request: Request, response: Response ){
    const { username, name, password } = request.body;

    const createUSerUseCase = new CreateUSerUseCase();
    
    const user = await createUSerUseCase.execute({
        username,
        name,
        password,
    });
    return response.json(user)
    }
}

export {CreateUserController}