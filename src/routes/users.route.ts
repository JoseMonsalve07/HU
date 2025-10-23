import { Router } from "express";
import { registerController, loginController, refreshTokenController, getAllUsersController } from "../controllers/users.controller.ts";

const usersRouter: Router = Router();

usersRouter.post('/register', registerController);
usersRouter.post('/login', loginController);
usersRouter.post('/refresh', refreshTokenController);
usersRouter.get('/', getAllUsersController);

export default usersRouter;