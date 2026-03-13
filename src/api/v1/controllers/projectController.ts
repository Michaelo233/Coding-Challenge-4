import { Request, Response, NextFunction } from "express";
import * as postService from "../services/projectService";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

// handles POST request to create new post
export const createProjectHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const {name} = req.body;
        const projectData = {name};

        const newProject = await postService.createProject(projectData);

        res.status(HTTP_STATUS.CREATED).json(successResponse({newProject}, "Project created successfully"));
    } catch (error: unknown) {
        next(error);
    }
};

// // handles GET request to read all posts
export const getAllProjectsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const projects = await postService.getAllProjects();

        res.status(HTTP_STATUS.OK).json(successResponse({projects}, "Projects retrieved successfully"));
    } catch (error: unknown) {
        next(error);
    }
};


// handles GET request to read a single post by ID
export const getProjectByIdHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;

        const project = await postService.getProjectById(id as string);

        res.status(HTTP_STATUS.OK).json(successResponse({project}, "Project retrieved successfully"));
    } catch (error: unknown) {
        next(error);
    }
};


// handles PUT request to update an existing post
export const updateProjectHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const {name} = req.body;
        const updateData = {name};

        const updatedProject = await postService.updateProject(id as string, updateData);

        res.status(HTTP_STATUS.OK).json(successResponse({updatedProject}, "Project updated successfully"));
    } catch (error: unknown) {
        next(error);
    }
};


// handles DELETE request to delete an existing post
export const deleteProjectHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        
        await postService.deleteProject(id as string);

        res.status(HTTP_STATUS.OK).json(successResponse({}, "Project deleted successfully"));
    } catch (error: unknown) {
        next(error);
    }
};