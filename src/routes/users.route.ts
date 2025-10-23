import { Router } from "express";
import { registerController, loginController, refreshTokenController, getAllUsersController } from "../controllers/users.controller.ts";

const userRouter: Router = Router();

userRouter.post('/register', registerController);
userRouter.post('/login', loginController);
userRouter.post('/refresh', refreshTokenController);
userRouter.get('/', getAllUsersController);

export default userRouter;