import express from "express";
import { loginUserController, signupUserController, getAllImagePostsController, saveImagePostController } from "../controllers/user-controllers.js";
import { authenticateToken } from "../controllers/token-controllers.js";
import { uploadImageController, getImageController } from "../controllers/image-controllers.js";
import upload from "../middleware/upload.js";

const Router = express.Router();

Router.post('/signup',signupUserController);
Router.post('/login',loginUserController);
Router.get('/getAllImages',authenticateToken, getAllImagePostsController);
Router.post('/saveImage',authenticateToken, saveImagePostController);
Router.post('/image/upload', upload.single('file'), uploadImageController);
Router.get('/file/:filename',getImageController);

export default Router