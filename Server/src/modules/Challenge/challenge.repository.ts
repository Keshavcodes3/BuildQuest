import { FilterQuery } from "mongoose";
import { Challenge } from "./challenge.model.js";
import { Lesson } from "../Lesson/lesson.model.js";
import type { IChallenge } from "./challenge.types.js";

export class ChallengeRepository {
    // Create a new challenge
    async create(payload: Partial<IChallenge>) {
        return await Challenge.create(payload);
    }

    // Find challenge by ID with population
    async findById(id: string) {
        return await Challenge.findById(id)
            .populate("lessonId", "title slug")
            .populate("createdBy", "name username email")
            .lean();
    }

    // Find challenge by slug and lessonId
    async findBySlug(slug: string, lessonId: string) {
        return await Challenge.findOne({
            slug,
            lessonId,
        }).lean();
    }

    // Find lesson by ID to validate existence
    async findLessonById(lessonId: string) {
        return await Lesson.findById(lessonId).lean();
    }

    // Find all challenges with filtering and pagination
    async findAll(query: any) {
        const filter: FilterQuery<IChallenge> = {};

        if (query.lessonId) {
            filter.lessonId = query.lessonId;
        }

        if (query.type) {
            filter.type = query.type;
        }

        if (query.difficulty) {
            filter.difficulty = query.difficulty;
        }

        if (query.status) {
            filter.status = query.status;
        }

        if (query.search) {
            filter.$text = { $search: query.search };
        }

        if (query.tags && Array.isArray(query.tags)) {
            filter.tags = { $in: query.tags };
        }

        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;

        return await Challenge.find(filter)
            .populate("lessonId", "title slug")
            .populate("createdBy", "name username email")
            .sort({ order: 1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
    }

    // Find challenges by lessonId
    async findByLesson(lessonId: string) {
        return await Challenge.find({
            lessonId,
        })
            .sort({ order: 1 })
            .lean();
    }

    // Find published challenges by lessonId
    async findPublishedByLesson(lessonId: string) {
        return await Challenge.find({
            lessonId,
            status: "published",
        })
            .sort({ order: 1 })
            .lean();
    }

    // Update challenge by ID
    async update(id: string, payload: Partial<IChallenge>) {
        return await Challenge.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        }).lean();
    }

    // Delete challenge by ID
    async delete(id: string) {
        return await Challenge.findByIdAndDelete(id);
    }

    // Publish challenge
    async publish(id: string) {
        return await Challenge.findByIdAndUpdate(
            id,
            {
                status: "published",
                isPublished: true,
            },
            {
                new: true,
            }
        ).lean();
    }

    // Archive challenge
    async archive(id: string) {
        return await Challenge.findByIdAndUpdate(
            id,
            {
                status: "archived",
                isPublished: false,
            },
            {
                new: true,
            }
        ).lean();
    }

    // Reorder challenges using bulkWrite for efficiency
    async reorder(
        challenges: {
            id: string;
            order: number;
        }[]
    ) {
        const bulkOperations = challenges.map((challenge) => ({
            updateOne: {
                filter: { _id: challenge.id },
                update: {
                    $set: {
                        order: challenge.order,
                    },
                },
            },
        }));

        await Challenge.bulkWrite(bulkOperations);

        return await Challenge.find()
            .sort({ order: 1 })
            .lean();
    }

    // Count challenges by lesson for statistics
    async countByLesson(lessonId: string) {
        return await Challenge.countDocuments({ lessonId });
    }

    // Get challenge statistics
    async getStats() {
        return await Challenge.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    byType: {
                        $push: {
                            type: "$type",
                            count: 1,
                        },
                    },
                    byDifficulty: {
                        $push: {
                            difficulty: "$difficulty",
                            count: 1,
                        },
                    },
                },
            },
        ]);
    }
}
