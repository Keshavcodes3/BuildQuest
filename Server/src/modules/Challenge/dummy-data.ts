// ============================================
// DUMMY REQUEST BODIES
// ============================================

// Create Challenge Request
const createChallengeRequest = {
    title: "Reverse a String",
    slug: "reverse-a-string",
    shortDescription: "Write a function to reverse a given string",
    description: "In this challenge, you need to create a function that takes a string as input and returns the reversed version of that string. This is a fundamental programming problem that tests your understanding of string manipulation.",
    lessonId: "60d5ec9f8b3a8b0015d4a7a1",
    order: 1,
    type: "coding",
    difficulty: "easy",
    points: 10,
    starterCode: `function reverseString(str) {
  // Your code here
}`,
    solution: `function reverseString(str) {
  return str.split('').reverse().join('');
}`,
    explanation: "The solution uses JavaScript's built-in array methods. First, we split the string into an array of characters, then reverse the array, and finally join it back into a string.",
    hints: [
        {
            title: "Hint 1",
            content: "Think about how to convert a string into an array of characters"
        },
        {
            title: "Hint 2",
            content: "JavaScript arrays have a built-in reverse method"
        }
    ],
    resources: [
        {
            title: "MDN String Documentation",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String"
        }
    ],
    testCases: [
        {
            input: '"hello"',
            expectedOutput: '"olleh"',
            isHidden: false
        },
        {
            input: '"world"',
            expectedOutput: '"dlrow"',
            isHidden: false
        },
        {
            input: '"12345"',
            expectedOutput: '"54321"',
            isHidden: true
        }
    ],
    constraints: [
        {
            title: "No built-in functions",
            description: "Do not use built-in reverse functions"
        }
    ],
    examples: [
        {
            input: '"hello"',
            output: '"olleh"',
            explanation: "The string 'hello' reversed is 'olleh'"
        }
    ],
    tags: ["string", "beginner", "algorithm"],
    estimatedMinutes: 15
};

// Update Challenge Request
const updateChallengeRequest = {
    title: "Reverse a String - Updated",
    shortDescription: "Write a function to reverse a given string without using built-in methods",
    points: 15,
    difficulty: "medium",
    constraints: [
        {
            title: "No built-in functions",
            description: "Do not use any built-in reverse or array manipulation functions"
        }
    ]
};

// Reorder Challenges Request
const reorderChallengesRequest = {
    challenges: [
        { id: "60d5ec9f8b3a8b0015d4a7a2", order: 1 },
        { id: "60d5ec9f8b3a8b0015d4a7a3", order: 2 },
        { id: "60d5ec9f8b3a8b0015d4a7a4", order: 3 }
    ]
};

// Run Challenge Request
const runChallengeRequest = {
    code: `function reverseString(str) {
  return str.split('').reverse().join('');
}`,
    language: "javascript"
};

// Submit Challenge Request
const submitChallengeRequest = {
    code: `function reverseString(str) {
  return str.split('').reverse().join('');
}`,
    language: "javascript"
};

// ============================================
// EXAMPLE RESPONSES
// ============================================

// Challenge Response (Single)
const challengeResponse = {
    _id: "60d5ec9f8b3a8b0015d4a7a2",
    title: "Reverse a String",
    slug: "reverse-a-string",
    shortDescription: "Write a function to reverse a given string",
    description: "In this challenge, you need to create a function that takes a string as input and returns the reversed version of that string.",
    lessonId: {
        _id: "60d5ec9f8b3a8b0015d4a7a1",
        title: "String Manipulation",
        slug: "string-manipulation"
    },
    order: 1,
    type: "coding",
    difficulty: "easy",
    points: 10,
    starterCode: `function reverseString(str) {
  // Your code here
}`,
    solution: "", // Only visible to admins
    explanation: "The solution uses JavaScript's built-in array methods...",
    hints: [
        {
            title: "Hint 1",
            content: "Think about how to convert a string into an array of characters"
        }
    ],
    resources: [
        {
            title: "MDN String Documentation",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String"
        }
    ],
    testCases: [
        {
            input: '"hello"',
            expectedOutput: '"olleh"',
            isHidden: false
        }
    ],
    constraints: [
        {
            title: "No built-in functions",
            description: "Do not use built-in reverse functions"
        }
    ],
    examples: [
        {
            input: '"hello"',
            output: '"olleh"',
            explanation: "The string 'hello' reversed is 'olleh'"
        }
    ],
    tags: ["string", "beginner", "algorithm"],
    estimatedMinutes: 15,
    isPublished: true,
    status: "published",
    createdBy: {
        _id: "60d5ec9f8b3a8b0015d4a700",
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com"
    },
    createdAt: "2023-07-20T10:00:00.000Z",
    updatedAt: "2023-07-20T10:00:00.000Z"
};

// Challenges List Response
const challengesListResponse = {
    success: true,
    data: [
        {
            _id: "60d5ec9f8b3a8b0015d4a7a2",
            title: "Reverse a String",
            slug: "reverse-a-string",
            shortDescription: "Write a function to reverse a given string",
            lessonId: {
                _id: "60d5ec9f8b3a8b0015d4a7a1",
                title: "String Manipulation"
            },
            order: 1,
            type: "coding",
            difficulty: "easy",
            points: 10,
            tags: ["string", "beginner"],
            estimatedMinutes: 15,
            isPublished: true,
            status: "published"
        },
        {
            _id: "60d5ec9f8b3a8b0015d4a7a3",
            title: "Palindrome Checker",
            slug: "palindrome-checker",
            shortDescription: "Check if a string is a palindrome",
            lessonId: {
                _id: "60d5ec9f8b3a8b0015d4a7a1",
                title: "String Manipulation"
            },
            order: 2,
            type: "coding",
            difficulty: "medium",
            points: 20,
            tags: ["string", "algorithm"],
            estimatedMinutes: 20,
            isPublished: true,
            status: "published"
        }
    ],
    message: "Challenges fetched successfully"
};

// Run Challenge Response
const runChallengeResponse = {
    success: true,
    data: {
        success: true,
        output: "olleh",
        executionTime: 125
    },
    message: "Challenge code executed successfully"
};

// Submit Challenge Response
const submitChallengeResponse = {
    success: true,
    data: {
        success: true,
        passed: true,
        score: 10,
        totalTests: 3,
        passedTests: 3,
        message: "All tests passed!",
        output: "olleh"
    },
    message: "Challenge submitted successfully"
};

// Error Response
const errorResponse = {
    success: false,
    message: "Challenge not found",
    statusCode: 404
};

// Statistics Response
const statsResponse = {
    success: true,
    data: {
        total: 42,
        byType: [
            { type: "coding", count: 25 },
            { type: "mcq", count: 10 },
            { type: "debugging", count: 7 }
        ],
        byDifficulty: [
            { difficulty: "easy", count: 20 },
            { difficulty: "medium", count: 15 },
            { difficulty: "hard", count: 7 }
        ]
    },
    message: "Challenge statistics fetched successfully"
};

// ============================================
// MCQ CHALLENGE EXAMPLE
// ============================================

const mcqChallengeRequest = {
    title: "What is the output of typeof null?",
    slug: "typeof-null",
    shortDescription: "Test your knowledge of JavaScript type coercion",
    description: "In JavaScript, the typeof operator returns a string indicating the type of the operand. What does typeof null return?",
    lessonId: "60d5ec9f8b3a8b0015d4a7a1",
    order: 1,
    type: "mcq",
    difficulty: "easy",
    points: 5,
    options: [
        "object",
        "null",
        "undefined",
        "string"
    ],
    correctAnswer: 0,
    explanation: "In JavaScript, typeof null returns 'object'. This is a well-known bug in JavaScript that has been kept for backward compatibility.",
    tags: ["javascript", "trivia", "typeof"],
    estimatedMinutes: 2
};

// ============================================
// DEBUGGING CHALLENGE EXAMPLE
// ============================================

const debuggingChallengeRequest = {
    title: "Fix the Infinite Loop",
    slug: "fix-infinite-loop",
    shortDescription: "Identify and fix the infinite loop in the code",
    description: "The following code contains an infinite loop. Your task is to identify the issue and fix it.",
    lessonId: "60d5ec9f8b3a8b0015d4a7a1",
    order: 2,
    type: "debugging",
    difficulty: "medium",
    points: 20,
    buggyCode: `function countToTen() {
  let i = 0;
  while (i < 10) {
    console.log(i);
  }
}`,
    fixedCode: `function countToTen() {
  let i = 0;
  while (i < 10) {
    console.log(i);
    i++;
  }
}`,
    explanation: "The loop was infinite because the counter variable 'i' was never incremented. Adding i++ fixes the issue.",
    tags: ["debugging", "loop", "javascript"],
    estimatedMinutes: 10
};

// ============================================
// OUTPUT PREDICTION CHALLENGE EXAMPLE
// ============================================

const outputPredictionChallengeRequest = {
    title: "Predict the Output",
    slug: "predict-output",
    shortDescription: "Predict the output of the given code snippet",
    description: "Read the code carefully and predict what will be logged to the console.",
    lessonId: "60d5ec9f8b3a8b0015d4a7a1",
    order: 3,
    type: "output_prediction",
    difficulty: "medium",
    points: 15,
    code: `console.log(1 + "2" + 3);`,
    options: [
        "6",
        "123",
        "15",
        "NaN"
    ],
    correctAnswer: 1,
    explanation: "JavaScript performs type coercion. The number 1 is converted to string and concatenated with '2', resulting in '12', then concatenated with 3 (converted to string) resulting in '123'.",
    tags: ["javascript", "type-coercion", "output"],
    estimatedMinutes: 5
};

// ============================================
// FILL IN THE BLANK CHALLENGE EXAMPLE
// ============================================

const fillInTheBlankChallengeRequest = {
    title: "Complete the Function",
    slug: "complete-function",
    shortDescription: "Fill in the missing code to complete the function",
    description: "The function is incomplete. Fill in the blank to make it work correctly.",
    lessonId: "60d5ec9f8b3a8b0015d4a7a1",
    order: 4,
    type: "fill_in_the_blank",
    difficulty: "easy",
    points: 10,
    template: `function add(a, b) {
  return ___;
}`,
    solution: "a + b",
    explanation: "The function needs to return the sum of a and b.",
    tags: ["javascript", "function", "basics"],
    estimatedMinutes: 5
};

// ============================================
// PROJECT TASK CHALLENGE EXAMPLE
// ============================================

const projectTaskChallengeRequest = {
    title: "Build a To-Do List",
    slug: "build-todo-list",
    shortDescription: "Create a complete to-do list application",
    description: "Build a to-do list application with the ability to add, delete, and mark tasks as complete. Use HTML, CSS, and JavaScript.",
    lessonId: "60d5ec9f8b3a8b0015d4a7a1",
    order: 5,
    type: "project_task",
    difficulty: "hard",
    points: 100,
    requirements: [
        "User can add new tasks",
        "User can delete tasks",
        "User can mark tasks as complete",
        "Tasks should persist in localStorage",
        "Responsive design"
    ],
    starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>To-Do List</title>
    <style>
        /* Add your styles here */
    </style>
</head>
<body>
    <h1>To-Do List</h1>
    <input type="text" id="taskInput" placeholder="Add a new task">
    <button id="addTask">Add</button>
    <ul id="taskList"></ul>
    <script>
        // Add your JavaScript here
    </script>
</body>
</html>`,
    solution: "/* Complete implementation would go here */",
    resources: [
        {
            title: "HTML5 Documentation",
            url: "https://developer.mozilla.org/en-US/docs/HTML"
        },
        {
            title: "CSS Documentation",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS"
        },
        {
            title: "JavaScript Documentation",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
        }
    ],
    tags: ["html", "css", "javascript", "project"],
    estimatedMinutes: 120
};

// ============================================
// EXPORT ALL DUMMY DATA
// ============================================

export {
    // Requests
    createChallengeRequest,
    updateChallengeRequest,
    reorderChallengesRequest,
    runChallengeRequest,
    submitChallengeRequest,
    mcqChallengeRequest,
    debuggingChallengeRequest,
    outputPredictionChallengeRequest,
    fillInTheBlankChallengeRequest,
    projectTaskChallengeRequest,
    // Responses
    challengeResponse,
    challengesListResponse,
    runChallengeResponse,
    submitChallengeResponse,
    errorResponse,
    statsResponse
};
