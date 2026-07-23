import { ApiError } from "../../constants/apiError.js";
import { ChallengeRepository } from "./challenge.repository.js";
import {
    ChallengeStatus,
    ChallengeDifficulty,
    ChallengeType,
    type CreateChallengeDTO,
    type UpdateChallengeDTO,
    type ReorderChallengeDTO,
    type RunChallengeDTO,
    type SubmitChallengeDTO,
} from "./challenge.types.js";

export class ChallengeService {
    private readonly challengeRepository: ChallengeRepository;

    constructor() {
        this.challengeRepository = new ChallengeRepository();
    }

    async createChallenge(payload: CreateChallengeDTO, userId: string) {
        // Validate lesson exists
        const lesson = await this.challengeRepository.findLessonById(
            payload.lessonId
        );
        if (!lesson) {
            throw new ApiError(404, "Lesson not found");
        }

        // Check for duplicate slug within the same lesson
        const existingChallenge = await this.challengeRepository.findBySlug(
            payload.slug,
            payload.lessonId
        );
        if (existingChallenge) {
            throw new ApiError(409, "Challenge with this slug already exists in this lesson");
        }

        // Check for duplicate order within the same lesson
        const existingChallenges = await this.challengeRepository.findByLesson(
            payload.lessonId
        );
        const orderExists = existingChallenges.some(
            (c) => c.order === payload.order
        );
        if (orderExists) {
            throw new ApiError(
                409,
                `Challenge with order ${payload.order} already exists in this lesson`
            );
        }

        return await this.challengeRepository.create({
            ...payload,
            createdBy: userId,
        });
    }

    async updateChallenge(id: string, payload: UpdateChallengeDTO) {
        const challenge = await this.challengeRepository.findById(id);
        if (!challenge) {
            throw new ApiError(404, "Challenge not found");
        }

        // If lessonId is being updated, validate the new lesson exists
        if (payload.lessonId && payload.lessonId !== challenge.lessonId.toString()) {
            const lesson = await this.challengeRepository.findLessonById(
                payload.lessonId
            );
            if (!lesson) {
                throw new ApiError(404, "Lesson not found");
            }
        }

        // If slug is being updated, check for duplicates
        if (payload.slug && payload.slug !== challenge.slug) {
            const lessonId = (payload.lessonId || challenge.lessonId).toString();
            const existingChallenge = await this.challengeRepository.findBySlug(
                payload.slug,
                lessonId
            );
            if (existingChallenge) {
                throw new ApiError(
                    409,
                    "Challenge with this slug already exists in this lesson"
                );
            }
        }

        // If order is being updated, check for duplicates
        if (payload.order && payload.order !== challenge.order) {
            const lessonId = (payload.lessonId || challenge.lessonId).toString();
            const existingChallenges = await this.challengeRepository.findByLesson(
                lessonId
            );
            const orderExists = existingChallenges.some(
                (c) => c.order === payload.order && c._id.toString() !== id
            );
            if (orderExists) {
                throw new ApiError(
                    409,
                    `Challenge with order ${payload.order} already exists in this lesson`
                );
            }
        }

        return await this.challengeRepository.update(id, payload);
    }

    async deleteChallenge(id: string) {
        const challenge = await this.challengeRepository.findById(id);
        if (!challenge) {
            throw new ApiError(404, "Challenge not found");
        }

        await this.challengeRepository.delete(id);
    }

    async getChallengeById(id: string) {
        const challenge = await this.challengeRepository.findById(id);
        if (!challenge) {
            throw new ApiError(404, "Challenge not found");
        }
        return challenge;
    }

    async getAllChallenges(query: any) {
        return await this.challengeRepository.findAll(query);
    }

    async getChallengesByLesson(lessonId: string) {
        // Validate lesson exists
        const lesson = await this.challengeRepository.findLessonById(lessonId);
        if (!lesson) {
            throw new ApiError(404, "Lesson not found");
        }

        return await this.challengeRepository.findByLesson(lessonId);
    }

    async publishChallenge(id: string) {
        const challenge = await this.challengeRepository.findById(id);
        if (!challenge) {
            throw new ApiError(404, "Challenge not found");
        }

        if (challenge.status === ChallengeStatus.PUBLISHED) {
            throw new ApiError(400, "Challenge is already published");
        }

        return await this.challengeRepository.publish(id);
    }

    async archiveChallenge(id: string) {
        const challenge = await this.challengeRepository.findById(id);
        if (!challenge) {
            throw new ApiError(404, "Challenge not found");
        }

        if (challenge.status === ChallengeStatus.ARCHIVED) {
            throw new ApiError(400, "Challenge is already archived");
        }

        return await this.challengeRepository.archive(id);
    }

    async reorderChallenges(payload: ReorderChallengeDTO) {
        // Validate all challenges exist
        for (const item of payload.challenges) {
            const challenge = await this.challengeRepository.findById(item.id);
            if (!challenge) {
                throw new ApiError(404, `Challenge with ID ${item.id} not found`);
            }
        }

        return await this.challengeRepository.reorder(payload.challenges);
    }

    async runChallenge(id: string, payload: RunChallengeDTO) {
        const challenge = await this.challengeRepository.findByIdWithTestCases(id);
        if (!challenge) {
            throw new ApiError(404, "Challenge not found");
        }

        // In a real implementation, this would execute the code in a sandbox
        // For now, return a mock response
        return {
            challengeId: id,
            code: payload.code,
            language: payload.language,
            output: "// Execution output would appear here",
            success: false,
            message: "Code execution not implemented yet",
        };
    }

    async submitChallenge(id: string, payload: SubmitChallengeDTO, userId: string) {
        const challenge = await this.challengeRepository.findByIdWithTestCases(id);
        if (!challenge) {
            throw new ApiError(404, "Challenge not found");
        }

        // Validate the challenge is published
        if (challenge.status !== ChallengeStatus.PUBLISHED) {
            throw new ApiError(400, "Challenge is not published");
        }

        // In a real implementation, this would:
        // 1. Execute the submitted solution
        // 2. Compare against test cases
        // 3. Calculate score
        // 4. Record submission

        // Mock response
        const allPassed = true; // Would be determined by test case results
        const score = allPassed ? challenge.points : 0;

        return {
            challengeId: id,
            userId,
            solution: payload.solution,
            language: payload.language,
            allTestCasesPassed: allPassed,
            score,
            totalPoints: challenge.points,
            passedTestCases: allPassed ? challenge.testCases.length : 0,
            totalTestCases: challenge.testCases.length,
            status: allPassed ? "passed" : "failed",
            submittedAt: new Date(),
        };
    }
}
