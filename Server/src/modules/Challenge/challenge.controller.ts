import type { Request, Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { ApiResponse } from "../../constants/apiError.js";
import { ChallengeService } from "./challenge.service.js";
import {
    createChallengeSchema,
    updateChallengeSchema,
    reorderChallengeSchema,
    runChallengeSchema,
    submitChallengeSchema,
    getAllChallengesQuerySchema,
} from "./challenge.validation.js";

class ChallengeController {
    private readonly challengeService: ChallengeService;

    constructor() {
        this.challengeService = new ChallengeService();
    }

    // Create a new challenge
    createChallenge = asyncHandler(async (req: Request, res: Response) => {
        const validatedData = createChallengeSchema.parse(req.body);
        const challenge = await this.challengeService.createChallenge(
            validatedData,
            req.user.userId
        );

        return res
            .status(201)
            .json(new ApiResponse(201, challenge, "Challenge created successfully"));
    });

    // Update a challenge
    updateChallenge = asyncHandler(async (req: Request, res: Response) => {
        const validatedData = updateChallengeSchema.parse(req.body);
        const challenge = await this.challengeService.updateChallenge(
            req.params.id,
            validatedData,
            req.user.userId
        );

        return res.json(
            new ApiResponse(200, challenge, "Challenge updated successfully")
        );
    });

    // Delete a challenge
    deleteChallenge = asyncHandler(async (req: Request, res: Response) => {
        await this.challengeService.deleteChallenge(req.params.id);

        return res.json(
            new ApiResponse(200, null, "Challenge deleted successfully")
        );
    });

    // Get challenge by ID
    getChallengeById = asyncHandler(async (req: Request, res: Response) => {
        const challenge = await this.challengeService.getChallengeById(req.params.id);

        return res.json(
            new ApiResponse(200, challenge, "Challenge fetched successfully")
        );
    });

    // Get all challenges with filtering and pagination
    getAllChallenges = asyncHandler(async (req: Request, res: Response) => {
        const validatedQuery = getAllChallengesQuerySchema.parse(req.query);
        const challenges = await this.challengeService.getAllChallenges(validatedQuery);

        return res.json(
            new ApiResponse(200, challenges, "Challenges fetched successfully")
        );
    });

    // Get challenges by lesson
    getChallengesByLesson = asyncHandler(async (req: Request, res: Response) => {
        const challenges = await this.challengeService.getChallengesByLesson(
            req.params.lessonId
        );

        return res.json(
            new ApiResponse(200, challenges, "Lesson challenges fetched successfully")
        );
    });

    // Publish a challenge
    publishChallenge = asyncHandler(async (req: Request, res: Response) => {
        const challenge = await this.challengeService.publishChallenge(req.params.id);

        return res.json(
            new ApiResponse(200, challenge, "Challenge published successfully")
        );
    });

    // Archive a challenge
    archiveChallenge = asyncHandler(async (req: Request, res: Response) => {
        const challenge = await this.challengeService.archiveChallenge(req.params.id);

        return res.json(
            new ApiResponse(200, challenge, "Challenge archived successfully")
        );
    });

    // Reorder challenges
    reorderChallenges = asyncHandler(async (req: Request, res: Response) => {
        const validatedData = reorderChallengeSchema.parse(req.body);
        const challenges = await this.challengeService.reorderChallenges(validatedData);

        return res.json(
            new ApiResponse(200, challenges, "Challenges reordered successfully")
        );
    });

    // Run challenge code
    runChallenge = asyncHandler(async (req: Request, res: Response) => {
        const validatedData = runChallengeSchema.parse(req.body);
        const result = await this.challengeService.runChallenge(
            req.params.id,
            validatedData
        );

        return res.json(
            new ApiResponse(200, result, "Challenge code executed successfully")
        );
    });

    // Submit challenge solution
    submitChallenge = asyncHandler(async (req: Request, res: Response) => {
        const validatedData = submitChallengeSchema.parse(req.body);
        const result = await this.challengeService.submitChallenge(
            req.params.id,
            validatedData,
            req.user.userId
        );

        return res.json(
            new ApiResponse(200, result, "Challenge submitted successfully")
        );
    });

    // Get challenge statistics
    getChallengeStats = asyncHandler(async (req: Request, res: Response) => {
        const stats = await this.challengeService.getChallengeStats();

        return res.json(
            new ApiResponse(200, stats, "Challenge statistics fetched successfully")
        );
    });
}

export const challengeController = new ChallengeController();
