import { Router } from "express";
import { lessonController } from "./lesson.controller.js";
import { verifyAuth } from "../../middleware/auth.middleware.js";

const router = Router();

router.use(verifyAuth);

router.get("/", lessonController.getAllLessons);

router.get("/:id", lessonController.getLessonById);

router.get(
    "/module/:moduleId",
    lessonController.getLessonsByModule
);

router.post("/", verifyAuth, lessonController.createLesson);

router.patch("/reorder", verifyAuth, lessonController.reorderLessons);

router.patch("/:id", verifyAuth, lessonController.updateLesson);

router.delete("/:id", verifyAuth, lessonController.deleteLesson);

router.patch("/:id/publish", verifyAuth, lessonController.publishLesson);

router.patch("/:id/archive", verifyAuth, lessonController.archiveLesson);

export default router;
