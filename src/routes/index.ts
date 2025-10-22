import { Router } from "express";
import userRouter from "./users.route.ts";

const router: Router = Router();

router.use("/users", userRouter);

export default router;