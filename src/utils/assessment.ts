// utils/assessmentUtils.ts

import { CompetencyLevel } from "@/constants/assessmentData";

export const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export const calculateScore = (questions: any[], answers: Record<string, string>): number => {
    let correct = 0;
    questions.forEach(question => {
        if (answers[question._id] === question.correctAnswer) {
            correct++;
        }
    });
    return Math.round((correct / questions.length) * 100);
};

export const getProgressStats = (questions: any[], answers: Record<string, string>, flaggedQuestions: Set<string>) => {
    const answered = Object.keys(answers).length;
    const flagged = flaggedQuestions.size;
    const remaining = questions.length - answered;
    return { answered, flagged, remaining };
};

export const getCompetencyColor = (level: CompetencyLevel): string => {
    switch (level) {
        case CompetencyLevel.A1: return 'bg-primary-100 text-primary-800';
        case CompetencyLevel.A2: return 'bg-primary-200 text-primary-800';
        case CompetencyLevel.B1: return 'bg-green-100 text-green-800';
        case CompetencyLevel.B2: return 'bg-green-200 text-green-800';
        case CompetencyLevel.C1: return 'bg-purple-100 text-purple-800';
        case CompetencyLevel.C2: return 'bg-purple-200 text-purple-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};