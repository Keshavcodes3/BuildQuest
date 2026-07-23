import { ApiError } from "../../constants/apiError.js";
import { RoadmapRepository } from "./roadmaps.repository.js";
export class RoadmapService {
    private readonly roadmapRepository: RoadmapRepository;

    constructor() {
        this.roadmapRepository = new RoadmapRepository();
    }

    async createRoadmap(payload: any, user: any) {
        const existingRoadmap = await this.roadmapRepository.findBySlug(
            payload.slug
        );

        if (existingRoadmap) {
            throw new ApiError(409, "Roadmap already exists");
        }

        return await this.roadmapRepository.create({
            ...payload,
            createdBy: user.userId,
        });
    }

    async updateRoadmap(id: string, payload: any) {
        const roadmap = await this.roadmapRepository.findById(id);

        if (!roadmap) {
            throw new ApiError(404, "Roadmap not found");
        }

        return await this.roadmapRepository.update(id, payload);
    }

    async deleteRoadmap(id: string) {
        const roadmap = await this.roadmapRepository.findById(id);

        if (!roadmap) {
            throw new ApiError(404, "Roadmap not found");
        }

        await this.roadmapRepository.delete(id);
    }

    async publishRoadmap(id: string) {
        const roadmap = await this.roadmapRepository.findById(id);

        if (!roadmap) {
            throw new ApiError(404, "Roadmap not found");
        }

        return await this.roadmapRepository.publish(id);
    }

    async archiveRoadmap(id: string) {
        const roadmap = await this.roadmapRepository.findById(id);

        if (!roadmap) {
            throw new ApiError(404, "Roadmap not found");
        }

        return await this.roadmapRepository.archive(id);
    }

    async getAllRoadmaps(query: any) {
        return await this.roadmapRepository.findAll(query);
    }

    async getRoadmapById(id: string) {
        const roadmap = await this.roadmapRepository.findById(id);

        if (!roadmap) {
            throw new ApiError(404, "Roadmap not found");
        }

        return roadmap;
    }

    async getRoadmapBySlug(slug: string) {
        const roadmap = await this.roadmapRepository.findBySlug(slug);

        if (!roadmap) {
            throw new ApiError(404, "Roadmap not found");
        }

        return roadmap;
    }

    async getFeaturedRoadmaps() {
        return await this.roadmapRepository.findFeatured();
    }

    async searchRoadmaps(query: any) {
        return await this.roadmapRepository.search(query);
    }

    async bookmarkRoadmap(userId: string, roadmapId: string) {
        return await this.roadmapRepository.bookmark(userId, roadmapId);
    }

    async removeBookmark(userId: string, roadmapId: string) {
        return await this.roadmapRepository.removeBookmark(userId, roadmapId);
    }

    async enrollRoadmap(userId: string, roadmapId: string) {
        return await this.roadmapRepository.enroll(userId, roadmapId);
    }

    async getEnrolledRoadmaps(userId: string) {
        return await this.roadmapRepository.getEnrolledRoadmaps(userId);
    }
}