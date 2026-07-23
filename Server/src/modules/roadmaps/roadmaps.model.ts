import { Schema, model } from "mongoose";
import {
    type IRoadmap,
    RoadmapDifficulty,
    RoadmapStatus,
} from "./roadmaps.types.js";

const roadmapSchema = new Schema<IRoadmap>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        shortDescription: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        thumbnail: {
            type: String,
            default: "",
        },

        banner: {
            type: String,
            default: "",
        },

        difficulty: {
            type: String,
            enum: Object.values(RoadmapDifficulty),
            default: RoadmapDifficulty.BEGINNER,
        },

        estimatedHours: {
            type: Number,
            default: 0,
        },

        technologies: [
            {
                type: String,
                trim: true,
            },
        ],

        tags: [
            {
                type: String,
                trim: true,
            },
        ],

        prerequisites: [
            {
                type: String,
                trim: true,
            },
        ],


        totalModules: {
            type: Number,
            default: 0,
        },

        totalLessons: {
            type: Number,
            default: 0,
        },

        totalChallenges: {
            type: Number,
            default: 0,
        },

        totalProjects: {
            type: Number,
            default: 0,
        },

        enrolledCount: {
            type: Number,
            default: 0,
        },

        completedCount: {
            type: Number,
            default: 0,
        },

        isFeatured: {
            type: Boolean,
            default: false,
        },

        status: {
            type: String,
            enum: Object.values(RoadmapStatus),
            default: RoadmapStatus.DRAFT,
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Roadmap = model<IRoadmap>("Roadmap", roadmapSchema);