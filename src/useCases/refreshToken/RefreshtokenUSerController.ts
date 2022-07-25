import { Request, Response } from "express"
import { RefreshTokenUserUSeCase } from "./RefreshTokenUserUseCase";


class RefreshTokenUserController {
    async handle(request: Request, response: Response) {
        const { refresh_token } = request.body;

        const refreshTokenUserUSeCase = new RefreshTokenUserUSeCase();

        const token = await refreshTokenUserUSeCase.execute(refresh_token)

        return response.json(token)
    }

}
export { RefreshTokenUserController }