import type { Request, Response } from "express";

import { asyncHandler } from "../../middleware/asyncHandler.js";
import { ApiResponse } from "../../constants/apiError.js";
import { RoadmapService } from "./roadmaps.service.js";
class RoadmapController {
    private readonly roadmapService: RoadmapService;

    constructor() {
        this.roadmapService = new RoadmapService();
    }

    createRoadmap = asyncHandler(async (req: Request, res: Response) => {
        const roadmap = await this.roadmapService.createRoadmap(req.body, req.user);

        return res
            .status(201)
            .json(new ApiResponse(201, roadmap, "Roadmap created successfully"));
    });

    updateRoadmap = asyncHandler(async (req: Request, res: Response) => {
        const roadmap = await this.roadmapService.updateRoadmap(
            req.params.id as string,
            req.body
        );

        return res.json(
            new ApiResponse(200, roadmap, "Roadmap updated successfully")
        );
    });

    deleteRoadmap = asyncHandler(async (req: Request, res: Response) => {
        await this.roadmapService.deleteRoadmap(req.params.id as string);

        return res.json(
            new ApiResponse(200, null, "Roadmap deleted successfully")
        );
    });

    publishRoadmap = asyncHandler(async (req: Request, res: Response) => {
        const roadmap = await this.roadmapService.publishRoadmap(req.params.id as string);

        return res.json(
            new ApiResponse(200, roadmap, "Roadmap published successfully")
        );
    });

    archiveRoadmap = asyncHandler(async (req: Request, res: Response) => {
        const roadmap = await this.roadmapService.archiveRoadmap(req.params.id as string);

        return res.json(
            new ApiResponse(200, roadmap, "Roadmap archived successfully")
        );
    });

    getAllRoadmaps = asyncHandler(async (req: Request, res: Response) => {
        const roadmaps = await this.roadmapService.getAllRoadmaps(req.query);

        return res.json(
            new ApiResponse(200, roadmaps, "Roadmaps fetched successfully")
        );
    });

    getRoadmapBySlug = asyncHandler(async (req: Request, res: Response) => {
        const roadmap = await this.roadmapService.getRoadmapBySlug(
            req.params.slug as string
        );

        return res.json(
            new ApiResponse(200, roadmap, "Roadmap fetched successfully")
        );
    });

    getFeaturedRoadmaps = asyncHandler(async (_: Request, res: Response) => {
        const roadmaps = await this.roadmapService.getFeaturedRoadmaps();

        return res.json(
            new ApiResponse(200, roadmaps, "Featured roadmaps fetched successfully")
        );
    });

    searchRoadmaps = asyncHandler(async (req: Request, res: Response) => {
        const result = await this.roadmapService.searchRoadmaps(req.query);

        return res.json(
            new ApiResponse(200, result, "Search completed successfully")
        );
    });

    bookmarkRoadmap = asyncHandler(async (req: Request, res: Response) => {
        const roadmap = await this.roadmapService.bookmarkRoadmap(
            req.user.id,
            req.params.id as string
        );

        return res.json(
            new ApiResponse(200, roadmap, "Roadmap bookmarked successfully")
        );
    });

    removeBookmark = asyncHandler(async (req: Request, res: Response) => {
        const roadmap = await this.roadmapService.removeBookmark(
            req.user.id,
            req.params.id as string
        );

        return res.json(
            new ApiResponse(200, roadmap, "Bookmark removed successfully")
        );
    });

    enrollRoadmap = asyncHandler(async (req: Request, res: Response) => {
        const roadmap = await this.roadmapService.enrollRoadmap(
            req.user.id,
            req.params.id as string
        );

        return res.json(
            new ApiResponse(200, roadmap, "Enrolled successfully")
        );
    });

    getEnrolledRoadmaps = asyncHandler(async (req: Request, res: Response) => {
        const roadmaps = await this.roadmapService.getEnrolledRoadmaps(
            req.user.id
        );

        return res.json(
            new ApiResponse(200, roadmaps, "Enrolled roadmaps fetched successfully")
        );
    });
}

export const roadmapController = new RoadmapController();