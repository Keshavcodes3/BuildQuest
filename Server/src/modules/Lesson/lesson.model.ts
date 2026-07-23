import { Schema, model } from "mongoose";
import {
    type ILesson,
    LessonDifficulty,
    LessonStatus,
} from "./lesson.type.js";

const lessonSchema = new Schema<ILesson>(
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

        moduleId: {
            type: Schema.Types.ObjectId,
            ref: "Module",
            required: true,
        },

        order: {
            type: Number,
            required: true,
            min: 1,
        },

        estimatedMinutes: {
            type: Number,
            default: 0,
        },

        difficulty: {
            type: String,
            enum: Object.values(LessonDifficulty),
            default: LessonDifficulty.BEGINNER,
        },

        thumbnail: {
            type: String,
            default: "",
        },

        videoUrl: {
            type: String,
            default: "",
        },

        content: {
            type: String,
            required: true,
        },

        resources: [
            {
                title: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
            },
        ],

        attachments: [
            {
                name: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
            },
        ],

        isFree: {
            type: Boolean,
            default: false,
        },

        isPublished: {
            type: Boolean,
            default: false,
        },

        status: {
            type: String,
            enum: Object.values(LessonStatus),
            default: LessonStatus.DRAFT,
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

// Same module cannot have duplicate lesson orders
lessonSchema.index(
    { moduleId: 1, order: 1 },
    { unique: true }
);

// Slug must be unique within a module
lessonSchema.index(
    { moduleId: 1, slug: 1 },
    { unique: true }
);

// Faster lesson fetching
lessonSchema.index({
    moduleId: 1,
    status: 1,
    order: 1,
});

export const Lesson = model<ILesson>("Lesson", lessonSchema);