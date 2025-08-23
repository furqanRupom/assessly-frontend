// interfaces/assessment.ts
export interface Question {
    _id: string;
    competency: string;
    level: CompetencyLevel;
    question: string;
    options: string[];
    correctAnswer: string;
}

export type CompetencyLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface AssessmentStep {
    name: string;
    levels: CompetencyLevel[];
    duration: number;
    questions: number;
}

export interface AssessmentData {
    _id: string;
    student: string;
    step: number;
    questions: string[];
    answers: Answer[];
    startTime: Date;
    endTime?: Date;
    completed: boolean;
    score?: number;
    certifiedLevel?: string;
}

export interface Answer {
    questionId: string;
    answer: string;
}

export interface AssessmentState {
    assessmentState: 'selection' | 'instructions' | 'active' | 'completed';
    selectedStep: number;
    currentQuestionIndex: number;
    answers: Record<string, string>;
    timeRemaining: number;
    isTimerActive: boolean;
    flaggedQuestions: Set<string>;
    showReview: boolean;
    assessmentId?: string;
}

export interface AssessmentResults {
    score: number;
    certifiedLevel: string;
    proceedToNextStep: boolean;
}

export interface StartAssessmentResponse {
    _id: string;
    student: string;
    step: number;
    questions: string[];
    answers: Answer[];
    startTime: Date;
    completed: boolean;
}

export interface SubmitAssessmentRequest {
    assessmentId: string;
    answers: { questionId: string; answer: string }[];
}

export interface StudentAssessment {
    _id: string;
    step: number;
    score: number;
    certifiedLevel?: string;
    completed: boolean;
    startTime: Date;
    endTime?: Date;
}