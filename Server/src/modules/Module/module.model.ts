import { Schema, model } from "mongoose";
import { type IModule, ModuleStatus } from "./module.types.js";

const moduleSchema = new Schema<IModule>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
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

        roadmapId: {
            type: Schema.Types.ObjectId,
            ref: "Roadmap",
            required: true,
        },

        order: {
            type: Number,
            required: true,
            min: 1,
        },

        estimatedHours: {
            type: Number,
            default: 0,
        },

        difficulty: {
            type: String,
            enum: ["beginner", "intermediate", "advanced"],
            default: "beginner",
        },

        thumbnail: {
            type: String,
            default: "",
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

        isPublished: {
            type: Boolean,
            default: false,
        },

        status: {
            type: String,
            enum: Object.values(ModuleStatus),
            default: ModuleStatus.DRAFT,
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

moduleSchema.index(
    { roadmapId: 1, order: 1 },
    { unique: true }
);

moduleSchema.index(
    { roadmapId: 1, slug: 1 },
    { unique: true }
);

export const Module = model<IModule>("Module", moduleSchema);