// components/QuestionReview.tsx
import React from 'react';
import { Timer, ArrowLeft, Flag, AlertTriangle, CheckCircle2, VerifiedIcon, X} from 'lucide-react';
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
    const unansweredQuestions = questions.filter(q => !answers[q._id]);
    const canSubmit = unansweredQuestions.length === 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50">
            <div className="bg-white  border-b-2 ">
                <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                            Final Assessment Review
                        </h1>
                        <span className="ml-4 px-4 py-2 bg-gradient-to-r from-primary-100 to-primary-100 text-primary-800 text-sm font-bold rounded-full">
                            Step {selectedStep}
                        </span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className={`flex items-center px-6 py-3 rounded-xl font-bold shadow-lg ${timeRemaining < 300
                            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                            : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                            }`}>
                            <Timer className="w-5 h-5 mr-2" />
                            {formatTime(timeRemaining)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-6">
                {/* Warning Section for Unanswered Questions */}
                {!canSubmit && (
                    <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 rounded-2xl p-6 mb-6">
                        <div className="flex items-start">
                            <AlertTriangle className="w-8 h-8 text-red-600 mr-4 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold text-red-800 mb-2">
                                    CANNOT SUBMIT - INCOMPLETE ASSESSMENT
                                </h3>
                                <p className="text-red-700 font-medium mb-2">
                                    You have {unansweredQuestions.length} unanswered question(s).
                                    All questions must be answered to submit the assessment.
                                </p>
                                <p className="text-red-600 text-sm font-semibold">
                                    Please answer all questions before attempting to submit.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Success Section for Complete Assessment */}
                {canSubmit && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-6 mb-6">
                        <div className="flex items-start">
                            <CheckCircle2 className="w-8 h-8 text-green-600 mr-4 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold text-green-800 mb-2">
                                 READY TO SUBMIT
                                </h3>
                                <p className="text-green-700 font-medium">
                                    Excellent! You have answered all questions. You can now submit your assessment.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Review Your Answers</h2>
                        <div className="flex items-center space-x-6 text-sm font-semibold">
                            <span className="flex items-center text-green-600">
                                <CheckCircle2 className="w-4 h-4 mr-1" />
                                Answered: {questions.length - unansweredQuestions.length}
                            </span>
                            <span className="flex items-center text-red-600">
                                <AlertTriangle className="w-4 h-4 mr-1" />
                                Missing: {unansweredQuestions.length}
                            </span>
                            <span className="flex items-center text-secondary-600">
                                <Flag className="w-4 h-4 mr-1" />
                                Flagged: {flaggedQuestions.size}
                            </span>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {questions.map((question, index) => {
                            const isAnswered = !!answers[question._id];
                            const isFlagged = flaggedQuestions.has(question._id);

                            return (
                                <div
                                    key={question._id}
                                    className={`border-2 rounded-xl p-6 transition-all ${isAnswered
                                        ? 'border-green-200 bg-green-50'
                                        : 'border-red-200 bg-red-50'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center">
                                            <span className="font-bold text-gray-800 text-lg mr-3">
                                                Q{index + 1}.
                                            </span>
                                            <span className="text-sm px-3 py-1 bg-gray-200 rounded-full text-gray-700 font-medium">
                                                {question.competency} - {question.level}
                                            </span>
                                            {isFlagged && (
                                                <Flag className="w-5 h-5 text-secondary-500 ml-3" />
                                            )}
                                        </div>
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isAnswered
                                            ? 'text-green-500'
                                            : ' text-red-500'
                                            }`}>
                                            {isAnswered ? <VerifiedIcon /> : <AlertTriangle />}
                                        </div>
                                    </div>
                                    <p className="text-gray-800 font-medium mb-3 text-lg">{question.question}</p>
                                    <p className={`font-semibold ${isAnswered
                                        ? 'text-green-700'
                                        : 'text-red-700'
                                        }`}>
                                            {
                                            isAnswered ? <span className='inline-flex gap-2 items-center'><VerifiedIcon size={20} /> Your answer: {answers[question._id]}</span> : <span className='inline-flex gap-2 items-center'><X size={20} /> Not answered - REQUIRED</span>
                                            }
                                        
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex justify-between mt-10 pt-6 border-t-2 border-gray-200">
                        <button
                            onClick={() => setShowReview(false)}
                            className="flex items-center px-8 py-4 text-gray-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-200 text-lg"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Questions
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!canSubmit}
                            className={`px-10 py-4 rounded-xl font-bold text-lg transition-all duration-200 ${canSubmit
                                ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl transform hover:scale-105'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            {canSubmit ? 'Submit Assessment' : `Answer ${unansweredQuestions.length} More Question(s)`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionReview