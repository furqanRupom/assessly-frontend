// components/AssessmentCompletion.tsx
import React from 'react';
import { CheckCircle2, Award, ArrowRight } from 'lucide-react';
import type { AssessmentStep, Question } from '@/interfaces/assessment';
import { calculateScore, formatTime } from '@/utils/assessment';


interface AssessmentCompletionProps {
    questions: Question[];
    assessmentData: AssessmentStep;
    selectedStep: number;
    answers: Record<string, string>;
    timeRemaining: number;
    setAssessmentState: (state: 'selection' | 'instructions' | 'active' | 'completed') => void;
    setSelectedStep: (step: number) => void;
    setCurrentQuestionIndex: (index: number) => void;
    setAnswers: (answers: Record<string, string>) => void;
    setFlaggedQuestions: (flagged: Set<string>) => void;
    setShowReview: (show: boolean) => void;
}

const AssessmentCompletion: React.FC<AssessmentCompletionProps> = ({
    questions,
    assessmentData,
    selectedStep,
    answers,
    timeRemaining,
    setAssessmentState,
    setSelectedStep,
    setCurrentQuestionIndex,
    setAnswers,
    setFlaggedQuestions,
    setShowReview
}) => {
    const score = calculateScore(questions, answers);
    const timeSpent = assessmentData.duration * 60 - timeRemaining;

    const handleRetake = () => {
        setAssessmentState('selection');
        setCurrentQuestionIndex(0);
        setAnswers({});
        setFlaggedQuestions(new Set());
        setShowReview(false);
    };

    const handleNextStep = () => {
        setSelectedStep(selectedStep + 1);
        setAssessmentState('selection');
        setCurrentQuestionIndex(0);
        setAnswers({});
        setFlaggedQuestions(new Set());
        setShowReview(false);
    };

    const getCertificationLevel = () => {
        if (selectedStep === 1) {
            if (score >= 75) return 'A1/A2 Certified';
            if (score >= 25) return 'Partial Competency';
            return 'Needs Improvement';
        } else if (selectedStep === 2) {
            if (score >= 75) return 'B1/B2 Certified';
            if (score >= 50) return 'Partial Competency';
            return 'Needs Improvement';
        } else {
            if (score >= 80) return 'C1/C2 Certified';
            if (score >= 60) return 'Partial Competency';
            return 'Needs Improvement';
        }
    };

    const certifiedLevel = getCertificationLevel();
    const canProceed = (selectedStep === 1 && score >= 75) || (selectedStep === 2 && score >= 75);

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">Assessment Completed!</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Thank you for completing the {assessmentData.name}
                </p>

                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8 mb-8">
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        <div>
                            <div className="text-4xl font-bold text-primary-600 mb-2">{score}%</div>
                            <div className="text-gray-600 font-medium">Overall Score</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-green-600 mb-2">{Object.keys(answers).length}</div>
                            <div className="text-gray-600 font-medium">Questions Answered</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-secondary-600 mb-2">
                                {score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B+' : score >= 60 ? 'B' : 'C'}
                            </div>
                            <div className="text-gray-600 font-medium">Grade</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                        <Award className="w-6 h-6 mr-2 text-secondary-600" />
                        Your Certification Level
                    </h3>
                    <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-bold ${score >= 75 ? 'bg-primary-100 text-primary-800' :
                        score >= (selectedStep === 1 ? 25 : 50) ? 'bg-secondary-100 text-secondary-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                        {certifiedLevel}
                    </div>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        {score >= 75 ?
                            `Congratulations! You've demonstrated strong digital competency${selectedStep < 3 ? ' and can proceed to the next step.' : '.'}` :
                            score >= (selectedStep === 1 ? 25 : 50) ?
                                'You have basic competency but may benefit from additional practice before advancing.' :
                                'Consider reviewing the material and retaking the assessment to improve your score.'
                        }
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    {canProceed && selectedStep < 3 && (
                        <button
                            onClick={handleNextStep}
                            className="bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center"
                        >
                            Proceed to Step {selectedStep + 1}
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                    )}

                    <button
                        onClick={handleRetake}
                        className="bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                    >
                        Take Another Assessment
                    </button>

                    <button className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
                        Download Certificate
                    </button>
                </div>

                <div className="mt-8 p-6 bg-primary-50 rounded-xl text-left">
                    <h3 className="text-lg font-bold text-primary-900 mb-3">Assessment Summary</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="font-medium">Time Spent:</span> {formatTime(timeSpent)}
                        </div>
                        <div>
                            <span className="font-medium">Total Questions:</span> {questions.length}
                        </div>
                        <div>
                            <span className="font-medium">Correct Answers:</span> {Math.round(questions.length * score / 100)}
                        </div>
                        <div>
                            <span className="font-medium">Step Completed:</span> {selectedStep}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssessmentCompletion;