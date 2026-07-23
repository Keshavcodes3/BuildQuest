import { Router } from "express";
import { challengeController } from "./challenge.controller.js";
import { verifyAuth } from "../../middleware/auth.middleware.js";

const router = Router();

// Public routes
router.get("/", challengeController.getAllChallenges);
router.get("/:id", challengeController.getChallengeById);
router.get("/lesson/:lessonId", challengeController.getChallengesByLesson);
router.get("/stats", challengeController.getChallengeStats);

// Protected routes (require authentication)
router.use(verifyAuth);

// Challenge execution routes
router.post("/:id/run", challengeController.runChallenge);
router.post("/:id/submit", challengeController.submitChallenge);

// Admin routes (require authentication)
router.post("/", challengeController.createChallenge);
router.patch("/reorder", challengeController.reorderChallenges);
router.patch("/:id", challengeController.updateChallenge);
router.delete("/:id", challengeController.deleteChallenge);
router.patch("/:id/publish", challengeController.publishChallenge);
router.patch("/:id/archive", challengeController.archiveChallenge);

export default router;
