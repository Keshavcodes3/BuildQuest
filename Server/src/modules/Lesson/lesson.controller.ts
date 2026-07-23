import type { Request, Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { ApiResponse } from "../../constants/apiError.js";
import { LessonService } from "./lesson.service.js";

class LessonController {
    private readonly lessonService: LessonService;

    constructor() {
        this.lessonService = new LessonService();
    }

     createLesson = asyncHandler(async (req: Request, res: Response) => {
         const lesson = await this.lessonService.createLesson(req.body, req.user.userId);

         return res
             .status(201)
             .json(new ApiResponse(201, lesson, "Lesson created successfully"));
     });

    updateLesson = asyncHandler(async (req: Request, res: Response) => {
        const lesson = await this.lessonService.updateLesson(
            req.params.id,
            req.body
        );

        return res.json(
            new ApiResponse(200, lesson, "Lesson updated successfully")
        );
    });

    deleteLesson = asyncHandler(async (req: Request, res: Response) => {
        await this.lessonService.deleteLesson(req.params.id);

        return res.json(
            new ApiResponse(200, null, "Lesson deleted successfully")
        );
    });

    getLessonById = asyncHandler(async (req: Request, res: Response) => {
        const lesson = await this.lessonService.getLessonById(req.params.id);

        return res.json(
            new ApiResponse(200, lesson, "Lesson fetched successfully")
        );
    });

    getAllLessons = asyncHandler(async (req: Request, res: Response) => {
        const lessons = await this.lessonService.getAllLessons(req.query);

        return res.json(
            new ApiResponse(200, lessons, "Lessons fetched successfully")
        );
    });

    getLessonsByModule = asyncHandler(async (req: Request, res: Response) => {
        const lessons = await this.lessonService.getLessonsByModule(
            req.params.moduleId
        );

        return res.json(
            new ApiResponse(
                200,
                lessons,
                "Lessons fetched successfully"
            )
        );
    });

    publishLesson = asyncHandler(async (req: Request, res: Response) => {
        const lesson = await this.lessonService.publishLesson(req.params.id);

        return res.json(
            new ApiResponse(
                200,
                lesson,
                "Lesson published successfully"
            )
        );
    });

    archiveLesson = asyncHandler(async (req: Request, res: Response) => {
        const lesson = await this.lessonService.archiveLesson(req.params.id);

        return res.json(
            new ApiResponse(
                200,
                lesson,
                "Lesson archived successfully"
            )
        );
    });

     reorderLessons = asyncHandler(async (req: Request, res: Response) => {
         const lessons = await this.lessonService.reorderLessons(req.body.lessons || req.body);

         return res.json(
             new ApiResponse(
                 200,
                 lessons,
                 "Lessons reordered successfully"
             )
         );
     });
}

export const lessonController = new LessonController();