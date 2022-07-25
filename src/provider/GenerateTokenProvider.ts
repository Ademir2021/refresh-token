import { sign } from "jsonwebtoken"

class GenerateTokenProvider {
    async execute(userId: string){
        const token = sign({},"a73eb9d2-be65-428b-9a9b-6cafb1987156", {
            subject: userId,
            expiresIn: "20s",
        });
    }
}

export { GenerateTokenProvider }