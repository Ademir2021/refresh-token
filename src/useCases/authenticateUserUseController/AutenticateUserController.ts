import { Request, Response} from "express"
import { AutheticateUSerUseCase } from "./AuthenticateUserUseCase"

class AuthenticateUSerController{

    async handle(request: Request, response: Response){
        const { username, password } = request.body

        const authenticateUserUseCase = new AutheticateUSerUseCase();

        const token = await authenticateUserUseCase.execute({
            username,
            password,
        });

        return response.json(token);
    }
}

export { AuthenticateUSerController }