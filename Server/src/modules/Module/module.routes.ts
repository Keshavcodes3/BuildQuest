import { Router } from "express";
import { moduleController } from "./module.controller.js";
import { verifyAuth } from "../../middleware/auth.middleware.js";

const router = Router();

router.use(verifyAuth);

router.get("/", moduleController.getAllModules);

router.patch("/reorder", verifyAuth, moduleController.reorderModules);

router.get("/:id", moduleController.getModuleById);

router.get(
    "/roadmap/:roadmapId",
    moduleController.getModulesByRoadmap
);



router.post("/", verifyAuth, moduleController.createModule);

router.patch("/:id", verifyAuth, moduleController.updateModule);

router.delete("/:id", verifyAuth, moduleController.deleteModule);

router.patch("/:id/publish", verifyAuth, moduleController.publishModule);

router.patch("/:id/archive", verifyAuth, moduleController.archiveModule);

export default router;