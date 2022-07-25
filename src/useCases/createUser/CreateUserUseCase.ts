import { hash } from "bcryptjs";
import { client } from "../../prisma/client";

interface IUserRequest{
    name: string;
    username: string;
    password: string;
}

class CreateUSerUseCase {

async execute({name, username, password}: IUserRequest){
        
// verificar se o usuário existe
const userAlreadyExists = await client.user.findFirst({
    where: {
        username,
    },
});

if (userAlreadyExists) {
    throw new Error("User alread exist !");
}

const passwordHash = await hash(password, 8);

const user = await client.user.create({
data:{
    name,
    username,
    password: passwordHash,
}
});

return user;
    }
}

export { CreateUSerUseCase };