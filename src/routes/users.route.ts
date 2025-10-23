import { Router } from "express";
import { registerController, loginController, refreshTokenController, getAllUsersController } from "../controllers/users.controller.ts";
import { verifyToken, checkRole } from "../middlewares/auth.middleware.ts";

const usersRouter: Router = Router();

usersRouter.post('/register', registerController);
usersRouter.post('/login', loginController);
usersRouter.post('/refresh', verifyToken, refreshTokenController);
usersRouter.get('/', verifyToken, checkRole(["admin, seller"]), getAllUsersController);

export default usersRouter;