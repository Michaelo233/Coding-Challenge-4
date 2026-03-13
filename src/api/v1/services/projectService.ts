import { Project } from "../models/projectModel";
import * as firestoreRepository from "../repositories/firestoreRepositories";
// import { eventSchemas } from "../validation/eventSchemas";
// import { validateRequest } from "../middleWare/validate";

const COLLECTION = "loanApp";

// creating new loanApplication 
export const createLoanApplication = async (
    applicationData: {
        applicant: string, 
        amount: number, 
    }): Promise<LoanApp> => {
    try {

        const loanApplications = await firestoreRepository.getAllDocuments<LoanApp>(COLLECTION)
        const newLoanData = {
            id: (loanApplications.length + 1).toString(), 
            applicant: applicationData.applicant,
            amount: applicationData.amount,
            status: "pending",
            createdAt: new Date().toISOString(),
        };
        
        const applicationId = await firestoreRepository.createDocument<LoanApp>(COLLECTION, newLoanData);
        
        return {applicationId, ... newLoanData} as LoanApp;
        
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to create loan application: ${errorMessage}`
        );
    }
};