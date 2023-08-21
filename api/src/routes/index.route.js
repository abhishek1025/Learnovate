import express from "express";
import feedbackRouter from "./feedback.routes.js";
import userRoutes from "./user.routes.js";
import examRoutes from "./exam.router.js";

const apiRoutes = express.Router()

apiRoutes.use("/users", userRoutes);
apiRoutes.use("/feedbacks", feedbackRouter)
apiRoutes.use("/exams", examRoutes)

export default apiRoutes