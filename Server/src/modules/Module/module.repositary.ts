import FilterQuery from "mongoose";

import { Module } from "./module.model.js";
import { Roadmap } from "../roadmaps/roadmaps.model.js";
import { type IModule, ModuleStatus } from "./module.types.js";

export class ModuleRepository {
    async create(payload: Partial<IModule>) {
        return await Module.create(payload);
    }

    async findById(id: string) {
        return await Module.findById(id)
            .populate("roadmapId", "title slug")
            .populate("createdBy", "name username email")
            .lean();
    }

    async findBySlug(slug: string, roadmapId: string) {
        return await Module.findOne({
            slug,
            roadmapId,
        }).lean();
    }

    async findRoadmapById(roadmapId: string) {
        return await Roadmap.findById(roadmapId).lean();
    }

    async findByRoadmap(roadmapId: string) {
        return await Module.find({
            roadmapId,
            status: ModuleStatus.PUBLISHED,
        })
            .sort({ order: 1 })
            .lean();
    }

    async findAll(query: any) {
        const filter: FilterQuery<IModule> = {};

        if (query.roadmapId) {
            filter.roadmapId = query.roadmapId;
        }

        if (query.status) {
            filter.status = query.status;
        }

        if (query.search) {
            filter.$or = [
                {
                    title: {
                        $regex: query.search,
                        $options: "i",
                    },
                },
                {
                    description: {
                        $regex: query.search,
                        $options: "i",
                    },
                },
            ];
        }

        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;

        return await Module.find(filter)
            .sort({ order: 1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
    }

    async update(id: string, payload: Partial<IModule>) {
        return await Module.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        }).lean();
    }

    async delete(id: string) {
        return await Module.findByIdAndDelete(id);
    }

    async publish(id: string) {
        return await Module.findByIdAndUpdate(
            id,
            {
                status: ModuleStatus.PUBLISHED,
                isPublished: true,
            },
            {
                new: true,
            }
        ).lean();
    }

    async archive(id: string) {
        return await Module.findByIdAndUpdate(
            id,
            {
                status: ModuleStatus.ARCHIVED,
                isPublished: false,
            },
            {
                new: true,
            }
        ).lean();
    }

    async reorder(
        modules: {
            id: string;
            order: number;
        }[]
    ) {
        const bulkOperations = modules.map((module) => ({
            updateOne: {
                filter: { _id: module.id },
                update: {
                    $set: {
                        order: module.order,
                    },
                },
            },
        }));

        await Module.bulkWrite(bulkOperations);

        return await Module.find()
            .sort({ order: 1 })
            .lean();
    }
}