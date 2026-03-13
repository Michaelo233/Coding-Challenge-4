import express from "express";
import { validateRequest } from "../middleware/validate";
import * as postController from "../controllers/projectController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const projectRouter = express.Router();

// create new post with authentication and role-based authorization
projectRouter.post("/",
    authenticate,
    isAuthorized({ hasRole: ["admin", "lead"] }),
    postController.createProjectHandler);
projectRouter.get("/", authenticate, postController.getAllProjectsHandler);

projectRouter.get("/:id", authenticate, postController.getProjectByIdHandler);

projectRouter.put("/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin", "lead"], allowSameUser: true }),
    postController.updateProjectHandler);

projectRouter.delete("/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin"]}), postController.deleteProjectHandler);

export default projectRouter