import { FilterQuery } from "mongoose";
import { Lesson } from "./lesson.model.js";
import { Module } from "../Module/module.model.js";
import { type ILesson, LessonStatus } from "./lesson.type.js";

export class LessonRepository {
    async create(payload: Partial<ILesson>) {
        return await Lesson.create(payload);
    }

    async findById(id: string) {
        return await Lesson.findById(id)
            .populate("moduleId", "title slug")
            .populate("createdBy", "name username email")
            .lean();
    }

    async findBySlug(slug: string, moduleId: string) {
        return await Lesson.findOne({
            slug,
            moduleId,
        }).lean();
    }

    async findModuleById(moduleId: string) {
        return await Module.findById(moduleId).lean();
    }

    async findByModule(moduleId: string) {
        return await Lesson.find({
            moduleId,
            status: LessonStatus.PUBLISHED,
        })
            .sort({ order: 1 })
            .lean();
    }

    async findAll(query: any) {
        const filter: FilterQuery<ILesson> = {};

        if (query.moduleId) {
            filter.moduleId = query.moduleId;
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

        return await Lesson.find(filter)
            .sort({ order: 1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
    }

    async update(id: string, payload: Partial<ILesson>) {
        return await Lesson.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        }).lean();
    }

    async delete(id: string) {
        return await Lesson.findByIdAndDelete(id);
    }

    async publish(id: string) {
        return await Lesson.findByIdAndUpdate(
            id,
            {
                status: LessonStatus.PUBLISHED,
                isPublished: true,
            },
            {
                new: true,
            }
        ).lean();
    }

    async archive(id: string) {
        return await Lesson.findByIdAndUpdate(
            id,
            {
                status: LessonStatus.ARCHIVED,
                isPublished: false,
            },
            {
                new: true,
            }
        ).lean();
    }

    async reorder(
        lessons: {
            id: string;
            order: number;
        }[]
    ) {
        const operations = lessons.map((lesson) => ({
            updateOne: {
                filter: {
                    _id: lesson.id,
                },
                update: {
                    $set: {
                        order: lesson.order,
                    },
                },
            },
        }));

        await Lesson.bulkWrite(operations);

        return await Lesson.find()
            .sort({ order: 1 })
            .lean();
    }
}