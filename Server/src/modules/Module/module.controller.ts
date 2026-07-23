import type { Request, Response } from "express";

import { asyncHandler } from "../../middleware/asyncHandler.js";
import { ApiResponse } from "../../constants/apiError.js";
import { ModuleService } from "./module.service.js";

class ModuleController {
    private readonly moduleService: ModuleService;

    constructor() {
        this.moduleService = new ModuleService();
    }

    createModule = asyncHandler(async (req: Request, res: Response) => {
        const module = await this.moduleService.createModule(
            req.body,
            req.user.userId
        );

        return res
            .status(201)
            .json(new ApiResponse(201, module, "Module created successfully"));
    });

    updateModule = asyncHandler(async (req: Request, res: Response) => {
        const module = await this.moduleService.updateModule(
            req.params.id as string,
            req.body
        );

        return res.json(
            new ApiResponse(200, module, "Module updated successfully")
        );
    });

    deleteModule = asyncHandler(async (req: Request, res: Response) => {
        await this.moduleService.deleteModule(req.params.id as string);

        return res.json(
            new ApiResponse(200, null, "Module deleted successfully")
        );
    });

    getModuleById = asyncHandler(async (req: Request, res: Response) => {
        const module = await this.moduleService.getModuleById(req.params.id as string);

        return res.json(
            new ApiResponse(200, module, "Module fetched successfully")
        );
    });

    getAllModules = asyncHandler(async (req: Request, res: Response) => {
        const modules = await this.moduleService.getAllModules(req.query);

        return res.json(
            new ApiResponse(200, modules, "Modules fetched successfully")
        );
    });

    getModulesByRoadmap = asyncHandler(async (req: Request, res: Response) => {
        const modules = await this.moduleService.getModulesByRoadmap(
            req.params.roadmapId as string
        );

        return res.json(
            new ApiResponse(
                200,
                modules,
                "Roadmap modules fetched successfully"
            )
        );
    });

    publishModule = asyncHandler(async (req: Request, res: Response) => {
        const module = await this.moduleService.publishModule(req.params.id as string);

        return res.json(
            new ApiResponse(200, module, "Module published successfully")
        );
    });

    archiveModule = asyncHandler(async (req: Request, res: Response) => {
        const module = await this.moduleService.archiveModule(req.params.id as string);

        return res.json(
            new ApiResponse(200, module, "Module archived successfully")
        );
    });

    reorderModules = asyncHandler(async (req: Request, res: Response) => {
        const modules = await this.moduleService.reorderModules(req.body);

        return res.json(
            new ApiResponse(200, modules, "Modules reordered successfully")
        );
    });
}

export const moduleController = new ModuleController();