// constants/assessmentData.ts

import type { AssessmentStep } from "@/interfaces/assessment";

export type CompetencyLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export const CompetencyLevel = {
    A1: "A1",
    A2: "A2",
    B1: "B1",
    B2: "B2",
    C1: "C1",
    C2: "C2"
} as const;


export const ASSESSMENT_STEPS: Record<number, AssessmentStep> = {
    1: { name: 'Foundation Assessment', levels: [CompetencyLevel.A1, CompetencyLevel.A2], duration: 45, questions: 44 },
    2: { name: 'Practical Evaluation', levels: [CompetencyLevel.B1, CompetencyLevel.B2], duration: 60, questions: 44 },
    3: { name: 'Expert Certification', levels: [CompetencyLevel.C1, CompetencyLevel.C2], duration: 90, questions: 44 }
};

export const STEP_LEVEL_MAP: Record<number, CompetencyLevel[]> = {
    1: [CompetencyLevel.A1, CompetencyLevel.A2],
    2: [CompetencyLevel.B1, CompetencyLevel.B2],
    3: [CompetencyLevel.C1, CompetencyLevel.C2]
};

export const getCertificationLevel = (step: number, scorePercent: number): string => {
    if (step === 1) {
        if (scorePercent >= 75) return 'A1/A2 Certified';
        if (scorePercent >= 25) return 'Partial Competency';
        return 'Needs Improvement';
    } else if (step === 2) {
        if (scorePercent >= 75) return 'B1/B2 Certified';
        if (scorePercent >= 50) return 'Partial Competency';
        return 'Needs Improvement';
    } else {
        if (scorePercent >= 80) return 'C1/C2 Certified';
        if (scorePercent >= 60) return 'Partial Competency';
        return 'Needs Improvement';
    }
};