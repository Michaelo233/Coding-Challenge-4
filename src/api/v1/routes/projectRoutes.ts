import express from "express";
import { validateRequest } from "../middleware/validate";
import * as postController from "../controllers/projectController";


const postRouter = express.Router();

// create new post with authentication and role-based authorization
postRouter.post("/", 
    
    postController.createProjectHandler);
