import { Router } from "express";

import { roadmapController } from "./roadmaps.controller.js";
import { verifyAuth } from "../../middleware/auth.middleware.js";

const router = Router();


router.get("/", verifyAuth, roadmapController.getAllRoadmaps);

router.get("/featured", verifyAuth, roadmapController.getFeaturedRoadmaps);

router.get("/search", verifyAuth, roadmapController.searchRoadmaps);

router.get("/:slug", verifyAuth, roadmapController.getRoadmapBySlug);

router.post("/:id/enroll", verifyAuth, roadmapController.enrollRoadmap);

router.get("/me/enrolled", verifyAuth, roadmapController.getEnrolledRoadmaps);

router.post("/:id/bookmark", verifyAuth, roadmapController.bookmarkRoadmap);

router.delete("/:id/bookmark", verifyAuth, roadmapController.removeBookmark);

router.post("/", verifyAuth, roadmapController.createRoadmap);

router.patch("/:id", verifyAuth, roadmapController.updateRoadmap);

router.delete("/:id", verifyAuth, roadmapController.deleteRoadmap);

router.patch("/:id/publish", verifyAuth, roadmapController.publishRoadmap);

router.patch("/:id/archive", verifyAuth, roadmapController.archiveRoadmap);

export default router;