import express from "express";
import feedbackRouter from "./feedback.routes.js";
import userRoutes from "./user.routes.js";

const apiRoutes = express.Router()

apiRoutes.use("/users", userRoutes);
apiRoutes.use("/feedbacks", feedbackRouter)

export default apiRoutes