import type FilterQuery from "mongoose";

import { Roadmap } from "./roadmaps.model.js";
import { type IRoadmap, RoadmapStatus } from "./roadmaps.types.js";
export class RoadmapRepository {
    async create(payload: Partial<IRoadmap>) {
        return await Roadmap.create(payload);
    }

    async findById(id: string) {
        return await Roadmap.findById(id)
            .populate("createdBy", "name username avatar")
            // .populate("modules")
            .lean();
    }

    async findBySlug(slug: string) {
        return await Roadmap.findOne({ slug })
            .populate("createdBy", "name username avatar")
            // .populate("modules")
            .lean();
    }

    async findAll(query: any) {
        const filter: FilterQuery<IRoadmap> = {};

        if (query.difficulty) {
            filter.difficulty = query.difficulty;
        }

        if (query.status) {
            filter.status = query.status;
        }

        if (query.search) {
            filter.$or = [
                { title: { $regex: query.search, $options: "i" } },
                { description: { $regex: query.search, $options: "i" } },
            ];
        }

        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;

        return await Roadmap.find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean();
    }

    async update(id: string, payload: Partial<IRoadmap>) {
        return await Roadmap.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        });
    }

    async delete(id: string) {
        return await Roadmap.findByIdAndDelete(id);
    }

    async publish(id: string) {
        return await Roadmap.findByIdAndUpdate(
            id,
            {
                status: RoadmapStatus.PUBLISHED,
            },
            {
                new: true,
            }
        );
    }

    async archive(id: string) {
        return await Roadmap.findByIdAndUpdate(
            id,
            {
                status: RoadmapStatus.ARCHIVED,
            },
            {
                new: true,
            }
        );
    }

    async findFeatured() {
        return await Roadmap.find({
            isFeatured: true,
            status: RoadmapStatus.PUBLISHED,
        })
            .sort({ enrolledCount: -1 })
            .lean();
    }

    async search(query: any) {
        return await Roadmap.find({
            title: {
                $regex: query.q,
                $options: "i",
            },
            status: RoadmapStatus.PUBLISHED,
        }).lean();
    }

    async bookmark(userId: string, roadmapId: string) {
        // TODO: Bookmark collection
        return true;
    }

    async removeBookmark(userId: string, roadmapId: string) {
        // TODO: Bookmark collection
        return true;
    }

    async enroll(userId: string, roadmapId: string) {
        // TODO: Enrollment collection
        return true;
    }

    async getEnrolledRoadmaps(userId: string) {
        // TODO: Enrollment collection
        return [];
    }
}