import express from "express";
import authController from "../../controllers/auth-controller.js";
import { validateBody } from "../../decorators/index.js";
import usersSchemas from "../../schemas/users-schemas.js";
import {authenticate, upload} from "../../middlewars/index.js";

const authRouter = express.Router();

authRouter.post('/register', validateBody(usersSchemas.userSignupSchema), authController.signup)

authRouter.post('/login', validateBody(usersSchemas.userSigninSchema), authController.signin)

authRouter.get('/verify/:verificationToken', authController.verify)

authRouter.post('/verify',validateBody(usersSchemas.userEmailSchema), authController.resendVerifyEmail)

authRouter.patch('/avatars', authenticate, upload.single('avatar'), authController.changeAvatar)

authRouter.get('/current', authenticate, authController.getCurrent)

authRouter.post('/logout', authenticate, authController.logout)

export default authRouter
