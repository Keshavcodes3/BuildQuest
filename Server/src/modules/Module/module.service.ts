import { ApiError } from "../../constants/apiError.js";
import { ModuleRepository } from "./module.repositary.js";
import { Types } from "mongoose";
export class ModuleService {
    private readonly moduleRepository: ModuleRepository;

    constructor() {
        this.moduleRepository = new ModuleRepository();
    }

    async createModule(payload: any, user: any) {
        const existingModule = await this.moduleRepository.findBySlug(
            payload.slug,
            payload.roadmapId
        );

        if (existingModule) {
            throw new ApiError(409, "Module already exists");
        }

        return await this.moduleRepository.create({
            ...payload,
            createdBy: user,
        });
    }

    async updateModule(id: string, payload: any) {
        const module = await this.moduleRepository.findById(id);

        if (!module) {
            throw new ApiError(404, "Module not found");
        }

        return await this.moduleRepository.update(id, payload);
    }

    async deleteModule(id: string) {
        const module = await this.moduleRepository.findById(id);

        if (!module) {
            throw new ApiError(404, "Module not found");
        }

        await this.moduleRepository.delete(id);
    }

    async getModuleById(id: string) {
        const module = await this.moduleRepository.findById(id);

        if (!module) {
            throw new ApiError(404, "Module not found");
        }

        return module;
    }

    async getAllModules(query: any) {
        return await this.moduleRepository.findAll(query);
    }

    async getModulesByRoadmap(roadmapId: string) {
        return await this.moduleRepository.findByRoadmap(roadmapId);
    }

    async publishModule(id: string) {
        const module = await this.moduleRepository.findById(id);

        if (!module) {
            throw new ApiError(404, "Module not found");
        }

        return await this.moduleRepository.publish(id);
    }

    async archiveModule(id: string) {
        const module = await this.moduleRepository.findById(id);

        if (!module) {
            throw new ApiError(404, "Module not found");
        }

        return await this.moduleRepository.archive(id);
    }

    async reorderModules(
        modules: {
            id: Types.ObjectId;
            order: number;
        }[]
    ) {
        return await this.moduleRepository.reorder(modules);
    }
}