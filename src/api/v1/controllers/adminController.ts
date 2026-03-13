// External library imports
import { Request, Response, NextFunction } from "express";

// Internal module imports
import { auth } from "../../../config/firebaseConfig";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const setCustomClaims = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {

    const { uid, claims } = req.body;

    try {
        
        if (!uid || !claims) {
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                successResponse({}, "uid and claims are required")
            );
            return;
        }

        // setting the custom claims for the user's firebase account
        await auth.setCustomUserClaims(uid, claims);

        res.status(HTTP_STATUS.OK).json(
            successResponse(
                {},
                `Custom claims set for user: ${uid}. User must obtain a new token for changes to take effect.`
            )
        );
    } catch (error) {
        next(error);
    }
};