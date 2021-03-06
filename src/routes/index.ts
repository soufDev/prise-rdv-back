import { Router } from "express";
import user from "./user";
import doctor from "./doctor";
import patient from "./patient";
import sessions from "./sessions";
import devices from "./devices";

import errorHandler from "../middlewares/errorHandler";

const routes = Router();

routes.use("/user", user);
routes.use("/doctor", doctor);
routes.use("/patient", patient);
routes.use("/sessions", sessions);
routes.use("/devices", devices);

routes.use(errorHandler);

export default routes;
