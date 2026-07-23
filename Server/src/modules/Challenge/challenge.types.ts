import { Types } from "mongoose";

// Challenge Types
export enum ChallengeType {
    MCQ = "mcq",
    CODING = "coding",
    DEBUGGING = "debugging",
    OUTPUT_PREDICTION = "output_prediction",
    FILL_IN_THE_BLANK = "fill_in_the_blank",
    PROJECT_TASK = "project_task",
}

// Difficulty Levels
export enum ChallengeDifficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

// Status
export enum ChallengeStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    ARCHIVED = "archived",
}

// Test Case Interface
export interface ITestCase {
    input: string;
    expectedOutput: string;
    isHidden: boolean;
}

// Example Interface
export interface IExample {
    input: string;
    output: string;
    explanation?: string;
}

// Constraint Interface
export interface IConstraint {
    type: string;
    value: string | number;
    description: string;
}

// Resource Interface
export interface IResource {
    title: string;
    url: string;
}

// Hint Interface
export interface IHint {
    content: string;
    level: number;
}

// Challenge Interface
export interface IChallenge {
    title: string;
    slug: string;
    shortDescription: string;
    description: string;
    lessonId: Types.ObjectId;
    order: number;
    type: ChallengeType;
    difficulty: ChallengeDifficulty;
    points: number;
    starterCode: string;
    solution: string;
    explanation: string;
    hints: IHint[];
    resources: IResource[];
    testCases: ITestCase[];
    constraints: IConstraint[];
    examples: IExample[];
    tags: string[];
    estimatedMinutes: number;
    isPublished: boolean;
    status: ChallengeStatus;
    createdBy: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

// DTO Interfaces
export interface CreateChallengeDTO {
    title: string;
    slug: string;
    shortDescription: string;
    description: string;
    lessonId: string;
    order: number;
    type: ChallengeType;
    difficulty: ChallengeDifficulty;
    points: number;
    starterCode: string;
    solution: string;
    explanation: string;
    hints?: IHint[];
    resources?: IResource[];
    testCases?: ITestCase[];
    constraints?: IConstraint[];
    examples?: IExample[];
    tags?: string[];
    estimatedMinutes?: number;
}

export interface UpdateChallengeDTO {
    title?: string;
    slug?: string;
    shortDescription?: string;
    description?: string;
    lessonId?: string;
    order?: number;
    type?: ChallengeType;
    difficulty?: ChallengeDifficulty;
    points?: number;
    starterCode?: string;
    solution?: string;
    explanation?: string;
    hints?: IHint[];
    resources?: IResource[];
    testCases?: ITestCase[];
    constraints?: IConstraint[];
    examples?: IExample[];
    tags?: string[];
    estimatedMinutes?: number;
}

export interface ReorderChallengeDTO {
    challenges: {
        id: string;
        order: number;
    }[];
}

export interface RunChallengeDTO {
    code: string;
    language?: string;
}

export interface SubmitChallengeDTO {
    solution: string;
    language?: string;
}
