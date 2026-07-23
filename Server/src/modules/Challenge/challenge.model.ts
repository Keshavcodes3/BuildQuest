import { Schema, model } from "mongoose";
import {
    type IChallenge,
    ChallengeType,
    ChallengeDifficulty,
    ChallengeStatus,
} from "./challenge.types.js";

const testCaseSchema = new Schema({
    input: { type: String, required: true },
    expectedOutput: { type: String, required: true },
    isHidden: { type: Boolean, default: false },
});

const exampleSchema = new Schema({
    input: { type: String, required: true },
    output: { type: String, required: true },
    explanation: { type: String },
});

const constraintSchema = new Schema({
    type: { type: String, required: true },
    value: { type: Schema.Types.Mixed, required: true },
    description: { type: String, required: true },
});

const resourceSchema = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
});

const hintSchema = new Schema({
    content: { type: String, required: true },
    level: { type: Number, required: true, min: 1 },
});

const challengeSchema = new Schema<IChallenge>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 200,
        },

        slug: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            minlength: 3,
            maxlength: 100,
        },

        shortDescription: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
            maxlength: 500,
        },

        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 20,
        },

        lessonId: {
            type: Schema.Types.ObjectId,
            ref: "Lesson",
            required: true,
        },

        order: {
            type: Number,
            required: true,
            min: 1,
        },

        type: {
            type: String,
            enum: Object.values(ChallengeType),
            default: ChallengeType.CODING,
        },

        difficulty: {
            type: String,
            enum: Object.values(ChallengeDifficulty),
            default: ChallengeDifficulty.EASY,
        },

        points: {
            type: Number,
            required: true,
            min: 1,
            default: 10,
        },

        starterCode: {
            type: String,
            default: "",
        },

        solution: {
            type: String,
            default: "",
        },

        explanation: {
            type: String,
            default: "",
        },

        hints: {
            type: [hintSchema],
            default: [],
        },

        resources: {
            type: [resourceSchema],
            default: [],
        },

        testCases: {
            type: [testCaseSchema],
            default: [],
        },

        constraints: {
            type: [constraintSchema],
            default: [],
        },

        examples: {
            type: [exampleSchema],
            default: [],
        },

        tags: {
            type: [String],
            default: [],
        },

        estimatedMinutes: {
            type: Number,
            required: true,
            min: 1,
            default: 10,
        },

        isPublished: {
            type: Boolean,
            default: false,
        },

        status: {
            type: String,
            enum: Object.values(ChallengeStatus),
            default: ChallengeStatus.DRAFT,
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

// Compound indexes
challengeSchema.index(
    { lessonId: 1, order: 1 },
    { unique: true }
);

challengeSchema.index(
    { lessonId: 1, slug: 1 },
    { unique: true }
);

// Indexes for faster querying
challengeSchema.index({ lessonId: 1, status: 1, order: 1 });
challengeSchema.index({ type: 1 });
challengeSchema.index({ difficulty: 1 });
challengeSchema.index({ tags: 1 });
challengeSchema.index({ createdBy: 1 });
challengeSchema.index({ status: 1 });

export const Challenge = model<IChallenge>("Challenge", challengeSchema);
