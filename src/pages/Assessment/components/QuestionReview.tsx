// components/QuestionReview.tsx
import React from 'react';
import { Timer, ArrowLeft, Flag } from 'lucide-react';
import type { Question } from '@/interfaces/assessment';

interface QuestionReviewProps {
    questions: Question[];
    answers: Record<string, string>;
    flaggedQuestions: Set<string>;
    setShowReview: (show: boolean) => void;
    handleSubmit: () => void;
    timeRemaining: number;
    formatTime: (seconds: number) => string;
    selectedStep: number;
}

const QuestionReview: React.FC<QuestionReviewProps> = ({
    questions,
    answers,
    flaggedQuestions,
    setShowReview,
    handleSubmit,
    timeRemaining,
    formatTime,
    selectedStep
}) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-lg border-b">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold text-gray-900">Assessment Review</h1>
                        <span className="ml-4 px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                            Step {selectedStep}
                        </span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className={`flex items-center px-4 py-2 rounded-lg font-bold ${timeRemaining < 300 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                            }`}>
                            <Timer className="w-4 h-4 mr-2" />
                            {formatTime(timeRemaining)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-6">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Answers</h2>

                    <div className="grid gap-4">
                        {questions.map((question, index) => (
                            <div key={question._id} className="border rounded-lg p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center">
                                        <span className="font-bold text-gray-700 mr-2">Q{index + 1}.</span>
                                        <span className="text-sm px-2 py-1 bg-gray-100 rounded text-gray-600">{question.level}</span>
                                        {flaggedQuestions.has(question._id) && (
                                            <Flag className="w-4 h-4 text-secondary-500 ml-2" />
                                        )}
                                    </div>
                                    <div className={`w-4 h-4 rounded-full ${answers[question._id] ? 'bg-green-400' : 'bg-gray-300'
                                        }`} />
                                </div>
                                <p className="text-gray-800 font-medium mb-2">{question.question}</p>
                                <p className={`text-sm ${answers[question._id] ? 'text-primary-600 font-medium' : 'text-red-600'
                                    }`}>
                                    {answers[question._id] ? `Your answer: ${answers[question._id]}` : 'Not answered'}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between mt-8">
                        <button
                            onClick={() => setShowReview(false)}
                            className="flex items-center px-6 py-3 text-gray-600 font-semibold rounded-xl hover:bg-gray-100"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Questions
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                        >
                            Submit Assessment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionReview;