# Challenge Module Documentation

## Overview

The **Challenge Module** is a core feature of ProjectForge, an open-source learning platform. This module enables users to create, manage, and solve various types of coding challenges organized within lessons.

## Architecture

The Challenge Module follows a **clean architecture** pattern with clear separation of concerns:

```
Controller
    ↓
Service
    ↓
Repository
    ↓
MongoDB
```

Each layer has a single responsibility:
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic and validation
- **Repositories**: Perform database operations
- **Models**: Define data schemas and relationships

## Folder Structure

```
Challenge/
├── challenge.types.ts        # TypeScript interfaces and enums
├── challenge.validation.ts   # Zod validation schemas
├── challenge.model.ts        # Mongoose schema and model
├── challenge.repository.ts   # Database operations
├── challenge.service.ts      # Business logic
├── challenge.controller.ts   # Route handlers
├── challenge.routes.ts       # RESTful route definitions
├── dummy-data.ts             # Example request/response data
└── CHALLENGE_MODULE_DOCS.md  # This documentation
```

---

## API Endpoints

### Public Routes

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/challenges` | Get all challenges with filtering | ❌ |
| GET | `/api/challenges/:id` | Get a specific challenge by ID | ❌ |
| GET | `/api/challenges/lesson/:lessonId` | Get challenges by lesson | ❌ |
| GET | `/api/challenges/stats` | Get challenge statistics | ❌ |

### Protected Routes (User)

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/api/challenges/:id/run` | Run challenge code | ✅ |
| POST | `/api/challenges/:id/submit` | Submit challenge solution | ✅ |

### Admin Routes

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/api/challenges` | Create a new challenge | ✅ (Admin) |
| PATCH | `/api/challenges/reorder` | Reorder challenges | ✅ (Admin) |
| PATCH | `/api/challenges/:id` | Update a challenge | ✅ (Admin) |
| DELETE | `/api/challenges/:id` | Delete a challenge | ✅ (Admin) |
| PATCH | `/api/challenges/:id/publish` | Publish a challenge | ✅ (Admin) |
| PATCH | `/api/challenges/:id/archive` | Archive a challenge | ✅ (Admin) |

---

## Data Models

### Challenge

```typescript
{
    _id: ObjectId;
    title: string;
    slug: string;
    shortDescription: string;
    description: string;
    lessonId: ObjectId;        // Reference to Lesson
    order: number;
    type: ChallengeType;
    difficulty: ChallengeDifficulty;
    points: number;
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
    isPublished: boolean;
    status: ChallengeStatus;
    createdBy: ObjectId;       // Reference to User
    createdAt: Date;
    updatedAt: Date;
}
```

### Enums

#### ChallengeType
- `MCQ` - Multiple Choice Question
- `CODING` - Coding challenge
- `DEBUGGING` - Debugging challenge
- `OUTPUT_PREDICTION` - Predict the output
- `FILL_IN_THE_BLANK` - Fill in the missing code
- `PROJECT_TASK` - Complete project task

#### ChallengeDifficulty
- `EASY` - Beginner level
- `MEDIUM` - Intermediate level
- `HARD` - Advanced level

#### ChallengeStatus
- `DRAFT` - Work in progress
- `PUBLISHED` - Available to users
- `ARCHIVED` - No longer available

### Sub-schemas

#### ITestCase
```typescript
{
    input: string;
    expectedOutput: string;
    isHidden: boolean;
}
```

#### IExample
```typescript
{
    input: string;
    output: string;
    explanation?: string;
}
```

#### IConstraint
```typescript
{
    title: string;
    description: string;
}
```

#### IResource
```typescript
{
    title: string;
    url: string;
}
```

#### IHint
```typescript
{
    title: string;
    content: string;
}
```

---

## Validation Schemas

All request data is validated using **Zod** before processing:

### createChallengeSchema
Validates all required fields for creating a new challenge.

### updateChallengeSchema
Validates fields for updating a challenge (all fields optional).

### reorderChallengeSchema
Validates the array of challenge IDs and their new order values.

### runChallengeSchema
Validates code submission for execution.

### submitChallengeSchema
Validates code submission for grading.

---

## Business Logic

### Service Layer Responsibilities

1. **Validation**
   - Check if lesson exists before creating/updating
   - Prevent duplicate slugs within the same lesson
   - Validate challenge ownership for updates

2. **State Management**
   - Prevent publishing already published challenges
   - Prevent archiving already archived challenges
   - Ensure proper status transitions

3. **Data Processing**
   - Handle reordering with bulk operations
   - Process test cases for coding challenges
   - Calculate scores for submissions

### Key Service Methods

| Method | Description |
|--------|-------------|
| `createChallenge()` | Creates a new challenge with validation |
| `updateChallenge()` | Updates a challenge with validation |
| `deleteChallenge()` | Deletes a challenge |
| `getChallengeById()` | Retrieves a single challenge |
| `getAllChallenges()` | Retrieves filtered/paginated challenges |
| `getChallengesByLesson()` | Retrieves challenges for a specific lesson |
| `publishChallenge()` | Publishes a challenge |
| `archiveChallenge()` | Archives a challenge |
| `reorderChallenges()` | Reorders multiple challenges |
| `runChallenge()` | Executes challenge code (mock) |
| `submitChallenge()` | Submits and grades challenge solution (mock) |

---

## Database Indexes

The Challenge model includes the following indexes for optimal query performance:

1. **Compound Index (Unique)**
   - `{ lessonId: 1, order: 1 }` - Ensures unique ordering within a lesson
   - `{ lessonId: 1, slug: 1 }` - Ensures unique slugs within a lesson

2. **Single Field Indexes**
   - `{ lessonId: 1 }` - Fast lesson-based queries
   - `{ type: 1 }` - Fast type filtering
   - `{ difficulty: 1 }` - Fast difficulty filtering
   - `{ status: 1 }` - Fast status filtering
   - `{ tags: 1 }` - Fast tag-based queries
   - `{ createdBy: 1 }` - Fast creator-based queries
   - `{ createdAt: -1 }` - Fast date-based sorting

3. **Text Index**
   - `{ title: "text", shortDescription: "text", description: "text", tags: "text" }` - Full-text search

---

## Error Handling

The module uses a consistent error handling approach:

1. **ApiError** class for custom errors with status codes
2. **asyncHandler** wrapper for controller methods
3. **Zod** validation errors for request data
4. **Mongoose** validation errors for database operations

### Common Error Responses

#### 400 Bad Request
```json
{
    "success": false,
    "message": "Validation error: ...",
    "errors": [...]
}
```

#### 401 Unauthorized
```json
{
    "success": false,
    "message": "Unauthorized request: No token provided"
}
```

#### 404 Not Found
```json
{
    "success": false,
    "message": "Challenge not found"
}
```

#### 409 Conflict
```json
{
    "success": false,
    "message": "Challenge with this slug already exists for this lesson"
}
```

---

## Example Requests and Responses

### Create Challenge

**Request:**
```http
POST /api/challenges
Content-Type: application/json
Authorization: Bearer <token>

{
    "title": "Reverse a String",
    "slug": "reverse-a-string",
    "shortDescription": "Write a function to reverse a given string",
    "description": "In this challenge...",
    "lessonId": "60d5ec9f8b3a8b0015d4a7a1",
    "order": 1,
    "type": "coding",
    "difficulty": "easy",
    "points": 10,
    "starterCode": "function reverseString(str) {}\n",
    "testCases": [
        {"input": '"hello"', "expectedOutput": '"olleh"', "isHidden": false}
    ]
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "_id": "60d5ec9f8b3a8b0015d4a7a2",
        "title": "Reverse a String",
        "slug": "reverse-a-string",
        ...
    },
    "message": "Challenge created successfully"
}
```

### Get Challenge by ID

**Request:**
```http
GET /api/challenges/60d5ec9f8b3a8b0015d4a7a2
```

**Response:**
```json
{
    "success": true,
    "data": {
        "_id": "60d5ec9f8b3a8b0015d4a7a2",
        "title": "Reverse a String",
        "slug": "reverse-a-string",
        "lessonId": {
            "_id": "60d5ec9f8b3a8b0015d4a7a1",
            "title": "String Manipulation",
            "slug": "string-manipulation"
        },
        "type": "coding",
        "difficulty": "easy",
        "points": 10,
        "testCases": [...],
        "createdBy": {
            "_id": "60d5ec9f8b3a8b0015d4a700",
            "name": "John Doe",
            "username": "johndoe"
        }
    },
    "message": "Challenge fetched successfully"
}
```

### Submit Challenge Solution

**Request:**
```http
POST /api/challenges/60d5ec9f8b3a8b0015d4a7a2/submit
Content-Type: application/json
Authorization: Bearer <token>

{
    "code": "function reverseString(str) { return str.split('').reverse().join(''); }",
    "language": "javascript"
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "success": true,
        "passed": true,
        "score": 10,
        "totalTests": 3,
        "passedTests": 3,
        "message": "All tests passed!",
        "output": "olleh"
    },
    "message": "Challenge submitted successfully"
}
```

### Reorder Challenges

**Request:**
```http
PATCH /api/challenges/reorder
Content-Type: application/json
Authorization: Bearer <token>

{
    "challenges": [
        { "id": "60d5ec9f8b3a8b0015d4a7a2", "order": 1 },
        { "id": "60d5ec9f8b3a8b0015d4a7a3", "order": 2 },
        { "id": "60d5ec9f8b3a8b0015d4a7a4", "order": 3 }
    ]
}
```

**Response:**
```json
{
    "success": true,
    "data": [...],
    "message": "Challenges reordered successfully"
}
```

---

## Integration with Other Modules

### Relationships

```
Roadmap
    ↓
Module
    ↓
Lesson
    ↓
Challenge
```

Each Challenge belongs to exactly one Lesson via the `lessonId` field.

### Dependencies

The Challenge Module depends on:
1. **Lesson Module** - For lesson validation and population
2. **User Module** - For creator information
3. **Auth Middleware** - For authentication and authorization
4. **ApiError** - For consistent error handling
5. **asyncHandler** - For async error handling

---

## Testing

### Unit Tests (Recommended)

1. **Repository Tests**
   - Test all database operations
   - Mock MongoDB responses

2. **Service Tests**
   - Test business logic
   - Test validation
   - Mock repository calls

3. **Controller Tests**
   - Test request/response handling
   - Test validation
   - Mock service calls

### Integration Tests

1. Test complete API flows
2. Test authentication requirements
3. Test data relationships

---

## Future Enhancements

1. **Code Execution Service**
   - Integrate with a sandbox service (e.g., Piston, Judge0)
   - Support multiple programming languages
   - Implement proper security measures

2. **Advanced Features**
   - Challenge timer
   - Multiple attempts
   - Hint system with cooldown
   - Solution discussion forum

3. **Analytics**
   - Track challenge completion rates
   - Identify difficult challenges
   - User progress tracking

4. **Collaboration**
   - Pair programming mode
   - Code review system
   - Mentor feedback

---

## Best Practices

1. **Security**
   - Always validate and sanitize user input
   - Use parameterized queries to prevent NoSQL injection
   - Implement rate limiting for code execution endpoints

2. **Performance**
   - Use indexes for frequently queried fields
   - Implement pagination for list endpoints
   - Use lean() for read-only queries

3. **Maintainability**
   - Keep controllers thin
   - Put business logic in services
   - Use TypeScript interfaces for type safety
   - Document all public methods

4. **Error Handling**
   - Provide meaningful error messages
   - Use appropriate HTTP status codes
   - Log errors for debugging

---

## License

This module is part of **ProjectForge**, an open-source learning platform.

MIT License - Feel free to use, modify, and distribute.

---

## Support

For issues or questions regarding the Challenge Module:
- Open an issue on the ProjectForge GitHub repository
- Check the main documentation
- Review the example data in `dummy-data.ts`
