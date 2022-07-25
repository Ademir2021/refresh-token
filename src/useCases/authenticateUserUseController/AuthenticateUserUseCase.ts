import { compare } from "bcryptjs"

import { client } from "../../prisma/client";
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";

interface IRequest{
    username: string;
    password: string;
}

class AutheticateUSerUseCase {

    async execute({username, password}: IRequest){

        // Verificar se o usuário existe
        const userAlreadyExists = await client.user.findFirst({
            where:{
                username,
            },
        });

        if (!userAlreadyExists){
            throw new Error("User or password incorrect");
        }

        // Verificar se a senha está correta
        const passwordMatch = compare(password, userAlreadyExists.password)
        if(!passwordMatch){
            throw new Error("User or password incorrect");
        }

        // Gerar token do usuário
       const generatetokenProvider = new GenerateTokenProvider();
       const token = await generatetokenProvider.execute(
        userAlreadyExists.id
       );

        const generateRefreshToken = new GenerateRefreshToken();
        const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id);

        await client.refreshToken.deleteMany({
            where:{
                userId: userAlreadyExists.id,
            },
        });

        return  { token, refreshToken }
    }

}

export { AutheticateUSerUseCase }
