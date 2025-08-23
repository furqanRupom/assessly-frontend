// components/QuestionNavigation.tsx
import React from 'react';
import { Flag } from 'lucide-react';
import type { Question } from '@/interfaces/assessment';

interface QuestionNavigationProps {
    questions: Question[];
    currentQuestionIndex: number;
    setCurrentQuestionIndex: (index: number) => void;
    answers: Record<string, string>;
    flaggedQuestions: Set<string>;
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers,
    flaggedQuestions
}) => {
    return (
        <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-4 sticky top-32">
                <h3 className="font-bold text-gray-900 mb-4">Question Navigator</h3>
                <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
                    {questions.map((question, index) => (
                        <button
                            key={question._id}
                            onClick={() => setCurrentQuestionIndex(index)}
                            className={`w-10 h-10 rounded-lg text-sm font-medium relative transition-all ${index === currentQuestionIndex
                                    ? 'bg-primary-600 text-white'
                                    : answers[question._id]
                                        ? 'bg-green-100 text-green-700 border border-green-300'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {index + 1}
                            {flaggedQuestions.has(question._id) && (
                                <Flag className="w-3 h-3 absolute -top-1 -right-1 text-secondary-500" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionNavigation;