import { z } from "zod";
import {
    ChallengeType,
    ChallengeDifficulty,
    ChallengeStatus,
} from "./challenge.types.js";

// Test Case Schema
export const testCaseSchema = z.object({
    input: z.string().min(1, "Input is required"),
    expectedOutput: z.string().min(1, "Expected output is required"),
    isHidden: z.boolean().default(false),
});

// Example Schema
export const exampleSchema = z.object({
    input: z.string().min(1, "Input is required"),
    output: z.string().min(1, "Output is required"),
    explanation: z.string().optional(),
});

// Constraint Schema
export const constraintSchema = z.object({
    type: z.string().min(1, "Type is required"),
    value: z.union([z.string(), z.number()]),
    description: z.string().min(1, "Description is required"),
});

// Resource Schema
export const resourceSchema = z.object({
    title: z.string().min(1, "Title is required"),
    url: z.string().url("Invalid URL format"),
});

// Hint Schema
export const hintSchema = z.object({
    content: z.string().min(1, "Content is required"),
    level: z.number().int().positive("Level must be a positive integer"),
});

// Create Challenge Schema
export const createChallengeSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(200),
    slug: z
        .string()
        .min(3, "Slug must be at least 3 characters")
        .max(100)
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            "Slug must be lowercase alphanumeric with hyphens only"
        ),
    shortDescription: z
        .string()
        .min(10, "Short description must be at least 10 characters")
        .max(500),
    description: z.string().min(20, "Description must be at least 20 characters"),
    lessonId: z.string().min(1, "Lesson ID is required"),
    order: z.number().int().positive("Order must be a positive integer"),
    type: z.nativeEnum(ChallengeType),
    difficulty: z.nativeEnum(ChallengeDifficulty),
    points: z.number().int().positive("Points must be a positive integer"),
    starterCode: z.string().default(""),
    solution: z.string().default(""),
    explanation: z.string().default(""),
    hints: z.array(hintSchema).default([]),
    resources: z.array(resourceSchema).default([]),
    testCases: z.array(testCaseSchema).default([]),
    constraints: z.array(constraintSchema).default([]),
    examples: z.array(exampleSchema).default([]),
    tags: z.array(z.string().min(1)).default([]),
    estimatedMinutes: z.number().int().positive("Estimated minutes must be positive").default(10),
});

// Update Challenge Schema
export const updateChallengeSchema = z.object({
    title: z.string().min(3).max(200).optional(),
    slug: z
        .string()
        .min(3)
        .max(100)
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .optional(),
    shortDescription: z.string().min(10).max(500).optional(),
    description: z.string().min(20).optional(),
    lessonId: z.string().min(1).optional(),
    order: z.number().int().positive().optional(),
    type: z.nativeEnum(ChallengeType).optional(),
    difficulty: z.nativeEnum(ChallengeDifficulty).optional(),
    points: z.number().int().positive().optional(),
    starterCode: z.string().optional(),
    solution: z.string().optional(),
    explanation: z.string().optional(),
    hints: z.array(hintSchema).optional(),
    resources: z.array(resourceSchema).optional(),
    testCases: z.array(testCaseSchema).optional(),
    constraints: z.array(constraintSchema).optional(),
    examples: z.array(exampleSchema).optional(),
    tags: z.array(z.string().min(1)).optional(),
    estimatedMinutes: z.number().int().positive().optional(),
});

// Reorder Challenge Schema
export const reorderChallengeSchema = z.object({
    challenges: z.array(
        z.object({
            id: z.string().min(1, "ID is required"),
            order: z.number().int().positive("Order must be a positive integer"),
        })
    ).min(1, "At least one challenge is required"),
});

// Run Challenge Schema
export const runChallengeSchema = z.object({
    code: z.string().min(1, "Code is required"),
    language: z.string().default("javascript"),
});

// Submit Challenge Schema
export const submitChallengeSchema = z.object({
    solution: z.string().min(1, "Solution is required"),
    language: z.string().default("javascript"),
});

// Export type definitions
export type CreateChallengeInput = z.infer<typeof createChallengeSchema>;
export type UpdateChallengeInput = z.infer<typeof updateChallengeSchema>;
export type ReorderChallengeInput = z.infer<typeof reorderChallengeSchema>;
export type RunChallengeInput = z.infer<typeof runChallengeSchema>;
export type SubmitChallengeInput = z.infer<typeof submitChallengeSchema>;
