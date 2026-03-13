import { Project } from "../models/projectModel";
import * as firestoreRepository from "../repositories/firestoreRepositories";
// import { eventSchemas } from "../validation/eventSchemas";
// import { validateRequest } from "../middleWare/validate";

const COLLECTION = "project";

// creating new project
export const createProject = async (
    projectData: {
        name: string,  
    }): Promise<Project> => {
    try {

        const projects = await firestoreRepository.getAllDocuments<Project>(COLLECTION)
        const newProjectData = {
            id: (projects.length + 1).toString(), 
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
            `Failed to create loan application: ${errorMessage}`
        );
    }
};