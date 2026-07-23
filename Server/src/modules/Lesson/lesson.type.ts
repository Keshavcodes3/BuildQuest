import { Types } from "mongoose";

export enum LessonStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    ARCHIVED = "archived",
}

export enum LessonDifficulty {
    BEGINNER = "beginner",
    INTERMEDIATE = "intermediate",
    ADVANCED = "advanced",
}

export interface ILesson {
    title: string;
    slug: string;

    shortDescription: string;
    description: string;

    moduleId: Types.ObjectId;

    order: number;

    estimatedMinutes: number;

    difficulty: LessonDifficulty;

    thumbnail?: string;

    videoUrl?: string;

    content: string;

    resources: {
        title: string;
        url: string;
    }[];

    attachments: {
        name: string;
        url: string;
    }[];

    isFree: boolean;

    isPublished: boolean;

    status: LessonStatus;

    createdBy: Types.ObjectId;

    createdAt: Date;
    updatedAt: Date;
}