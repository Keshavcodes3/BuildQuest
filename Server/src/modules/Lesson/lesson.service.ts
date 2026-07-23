import { ApiError } from "../../constants/apiError.js";
import { LessonRepository } from "./lesson.repositary.js";
import type { LessonStatus } from "./lesson.type.js";

export class LessonService {
    private readonly lessonRepository: LessonRepository;

    constructor() {
        this.lessonRepository = new LessonRepository();
    }

     async createLesson(payload: any, userId: any) {
         const module = await this.lessonRepository.findModuleById(
             payload.moduleId
         );

         if (!module) {
             throw new ApiError(404, "Module not found");
         }

         const existingLesson = await this.lessonRepository.findBySlug(
             payload.slug,
             payload.moduleId
         );

         if (existingLesson) {
             throw new ApiError(
                 409,
                 "Lesson with this slug already exists"
             );
         }

         return await this.lessonRepository.create({
             ...payload,
             createdBy: userId,
         });
     }

    async updateLesson(id: string, payload: any) {
        const lesson = await this.lessonRepository.findById(id);

        if (!lesson) {
            throw new ApiError(404, "Lesson not found");
        }

        return await this.lessonRepository.update(id, payload);
    }

    async deleteLesson(id: string) {
        const lesson = await this.lessonRepository.findById(id);

        if (!lesson) {
            throw new ApiError(404, "Lesson not found");
        }

        await this.lessonRepository.delete(id);
    }

    async getLessonById(id: string) {
        const lesson = await this.lessonRepository.findById(id);

        if (!lesson) {
            throw new ApiError(404, "Lesson not found");
        }

        return lesson;
    }

    async getAllLessons(query: any) {
        return await this.lessonRepository.findAll(query);
    }

    async getLessonsByModule(moduleId: string) {
        return await this.lessonRepository.findByModule(moduleId);
    }

    async publishLesson(id: string) {
        const lesson = await this.lessonRepository.findById(id);

        if (!lesson) {
            throw new ApiError(404, "Lesson not found");
        }

        if (lesson.status === LessonStatus.PUBLISHED) {
            throw new ApiError(400, "Lesson is already published");
        }

        return await this.lessonRepository.publish(id);
    }

    async archiveLesson(id: string) {
        const lesson = await this.lessonRepository.findById(id);

        if (!lesson) {
            throw new ApiError(404, "Lesson not found");
        }

        if (lesson.status === LessonStatus.ARCHIVED) {
            throw new ApiError(400, "Lesson is already archived");
        }

        return await this.lessonRepository.archive(id);
    }

    async reorderLessons(
        lessons: {
            id: string;
            order: number;
        }[]
    ) {
        return await this.lessonRepository.reorder(lessons);
    }
}