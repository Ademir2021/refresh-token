import { response, Router} from "express"
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { AuthenticateUSerController } from "./useCases/authenticateUserUseController/AutenticateUserController";
import { CreateUserController } from "./useCases/createUser/CreateUserController";
import { RefreshTokenUserController } from "./useCases/refreshToken/RefreshtokenUSerController";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUSerController = new AuthenticateUSerController();
const refreshTokenUSerController = new RefreshTokenUserController();

router.post("/users", createUserController.handle);
router.post("/login", authenticateUSerController.handle);
router.post("/refresh-token", refreshTokenUSerController.handle);

router.get("/courses", ensureAuthenticated, (request, response)=> {
    return response.json([
        { id: 1, name: "NodeJS" },
        { id: 2, name: "ReactJS" },
        { id: 3, name: "React native" },
        { id: 4, name: "JavaScript" }
    ])
})

export { router }