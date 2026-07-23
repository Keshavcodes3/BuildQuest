import { Types } from "mongoose";

export enum RoadmapDifficulty {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

export enum RoadmapStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

export interface IRoadmap {
  title: string;
  slug: string;

  shortDescription: string;
  description: string;

  thumbnail?: string;
  banner?: string;

  difficulty: RoadmapDifficulty;
  estimatedHours: number;

  technologies: string[];
  tags: string[];
  prerequisites: string[];

  modules: Types.ObjectId[];

  totalModules: number;
  totalLessons: number;
  totalChallenges: number;
  totalProjects: number;

  enrolledCount: number;
  completedCount: number;

  isFeatured: boolean;
  status: RoadmapStatus;

  createdBy: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}