import { Project } from "../models/projectModel";
import * as firestoreRepository from "../repositories/firestoreRepositories";
// import { eventSchemas } from "../validation/eventSchemas";
// import { validateRequest } from "../middleWare/validate";

const COLLECTION = "Project";

// creating new project
export const createProject = async (
    projectData: {
        name: string,  
    }): Promise<Project> => {
    try {

        const projects = await firestoreRepository.getAllDocuments<Project>(COLLECTION)
        const newProjectData = {
            id: projects.length + 1, 
            name: projectData.name,
            status: "active",
            createdAt: new Date().toISOString(),
        };
        
        const projectId = await firestoreRepository.createDocument<Project>(COLLECTION, newProjectData);
        
        return {projectId, ... newProjectData} as Project;
        
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to create project application: ${errorMessage}`
        );
    }
};

// get all projects in collection
export const getAllProjects = async (): Promise<Project[]> => {
    try {
        const projects =
            await firestoreRepository.getAllDocuments<Project>(COLLECTION);

            return projects;
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to retrieve all projects: ${errorMessage}`);
    }
};

// Get project by id
export const getProjectById = async (id: string): Promise<Project> => {
    try {
        const project = await firestoreRepository.getDocById<Project>(
            COLLECTION,
            id
        );

        if (!project) {
            throw new Error("Project not found");
        }

        return project;
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to retrieve the project: ${errorMessage}`);
    }
};

// Updating the project

export const updateProject = async (
    id: string,
    projectData: { name?: string; status?: string }
): Promise<Project | null> => {
    try {
        const updatedProjectData: Partial<Project> = {};

        if (projectData.name !== undefined) {
            updatedProjectData.name = projectData.name;
        }

        if (projectData.status !== undefined) {
            updatedProjectData.status = projectData.status;
        }

        if (Object.keys(updatedProjectData).length === 0) {
            throw new Error("No fields provided to update");
        }

        await firestoreRepository.updateDocument(
            COLLECTION,
            id,
            updatedProjectData
        );

        const updatedProject = await firestoreRepository.getDocById<Project>(
            COLLECTION,
            id
        );

        if (!updatedProject) {
            throw new Error("Updated project not found");
        }

        return updatedProject;
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to update the project: ${errorMessage}`);
    }
};

// Delete the project
export const deleteProject = async (id: string): Promise<void> => {
    try {
        await firestoreRepository.deleteDocument(COLLECTION, id);
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to delete the project: ${errorMessage}`);
    }
};