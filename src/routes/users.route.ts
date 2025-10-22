import { Router } from "express";
import { registerController, loginController } from "../controllers/users.controller.ts";

const userRouter: Router = Router();

userRouter.post('/register', registerController);
userRouter.post('/login', loginController);

export default userRouter;