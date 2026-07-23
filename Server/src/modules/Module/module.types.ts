import { Types } from "mongoose";

export enum ModuleStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    ARCHIVED = "archived",
}

export interface IModule {
    title: string;
    slug: string;

    shortDescription: string;
    description: string;

    roadmapId: Types.ObjectId;

    order: number;

    estimatedHours: number;

    difficulty: "beginner" | "intermediate" | "advanced";

    thumbnail?: string;

    totalLessons: number;
    totalChallenges: number;
    totalProjects: number;

    isPublished: boolean;

    status: ModuleStatus;

    createdBy: Types.ObjectId;

    createdAt: Date;
    updatedAt: Date;
}