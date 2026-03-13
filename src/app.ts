import express, { Express } from "express";
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";

/** import the routes **/
import projectRouter from "./api/v1/routes/projectRoutes";

const app: Express = express();

if (process.env.NODE_ENV === "production") {
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    app.use(consoleLogger);
}

app.use(express.json());


/** Update the api endppoints with appropriate routes **/
// add API endpoint routes
app.use("/api/v1/projects", projectRouter);




app.use(errorHandler);

export default app;