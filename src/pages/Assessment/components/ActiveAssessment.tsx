// components/ActiveAssessment.tsx
import React from 'react';
import { Timer, Flag, CheckCircle2, HelpCircle, ArrowLeft, ArrowRight, AlertTriangle, X, Verified } from 'lucide-react';
import QuestionNavigation from './QuestionNavigation';
import QuestionReview from './QuestionReview';
import type { AssessmentStep, Question } from '@/interfaces/assessment';
import { formatTime, getProgressStats } from '@/utils/assessment';

interface ActiveAssessmentProps {
    questions: Question[];
    assessmentData: AssessmentStep;
    selectedStep: number;
    currentQuestionIndex: number;
    setCurrentQuestionIndex: (index: number) => void;
    answers: Record<string, string>;
    handleAnswerSelect: (questionId: string, answer: string) => void;
    timeRemaining: number;
    isTimerActive: boolean;
    setIsTimerActive: (active: boolean) => void;
    flaggedQuestions: Set<string>;
    toggleFlag: (questionId: string) => void;
    showReview: boolean;
    setShowReview: (show: boolean) => void;
    handleSubmit: () => void;
}

const ActiveAssessment: React.FC<ActiveAssessmentProps> = ({
    questions,
    assessmentData,
    selectedStep,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers,
    handleAnswerSelect,
    timeRemaining,
    flaggedQuestions,
    toggleFlag,
    showReview,
    setShowReview,
    handleSubmit
}) => {
    const currentQuestion = questions[currentQuestionIndex];
    const stats = getProgressStats(questions, answers, flaggedQuestions);
    const unansweredCount = questions.length - stats.answered;

    if (showReview) {
        return (
            <QuestionReview
                questions={questions}
                answers={answers}
                flaggedQuestions={flaggedQuestions}
                setShowReview={setShowReview}
                handleSubmit={handleSubmit}
                timeRemaining={timeRemaining}
                selectedStep={selectedStep}
                formatTime={formatTime}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50">
            <div className="bg-white rounded-4xl border-b-2  ">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                                Digital Competency Assessment
                            </h1>
                            <span className="ml-4 px-4 py-2 bg-gradient-to-r from-primary-100 to-primary-100 text-primary-800 text-sm font-bold rounded-full">
                                Step {selectedStep} - {assessmentData.name}
                            </span>
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className={`flex items-center px-6 py-3 rounded-xl font-bold shadow-lg ${timeRemaining < 300
                                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white animate-pulse'
                                : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                                }`}>
                                <Timer className="w-5 h-5 mr-2" />
                                {formatTime(timeRemaining)}
                            </div>
                            <button
                                onClick={() => setShowReview(true)}
                                className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-xl font-bold hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                Review Answers
                            </button>
                        </div>
                    </div>

                    {/* Enhanced Progress Section */}
                    <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-4 mb-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex-1 mr-4">
                                <div className="w-full bg-gray-300 rounded-full h-3 shadow-inner">
                                    <div
                                        className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500 shadow-lg"
                                        style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                                    />
                                </div>
                            </div>
                            <div className="text-sm text-gray-700 font-bold bg-white px-3 py-1 rounded-full">
                                {currentQuestionIndex + 1} of {questions.length}
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-6">
                                <span className="flex items-center text-green-700 font-bold bg-green-100 px-3 py-1 rounded-full">
                                    <CheckCircle2 className="w-4 h-4 mr-1" />
                                    Completed: {stats.answered}
                                </span>
                                <span className="flex items-center text-secondary-700 font-bold bg-secondary-100 px-3 py-1 rounded-full">
                                    <Flag className="w-4 h-4 mr-1" />
                                    Flagged: {stats.flagged}
                                </span>
                                {unansweredCount > 0 && (
                                    <span className="flex items-center text-red-700 font-bold bg-red-100 px-3 py-1 rounded-full animate-pulse">
                                        <AlertTriangle className="w-4 h-4 mr-1" />
                                        Missing: {unansweredCount}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Reminder for mandatory questions */}
                    {unansweredCount > 0 && (
                        <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl p-3 mb-4">
                            <p className="text-red-700 font-semibold text-sm text-center flex justify-center gap-2">
                                <AlertTriangle size={18} /> Remember: ALL {questions.length} questions must be answered to submit the assessment
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-6">
                <div className="grid lg:grid-cols-4 gap-6">
                    <QuestionNavigation
                        questions={questions}
                        currentQuestionIndex={currentQuestionIndex}
                        setCurrentQuestionIndex={setCurrentQuestionIndex}
                        answers={answers}
                        flaggedQuestions={flaggedQuestions}
                    />

                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center">
                                    <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mr-4">
                                        Question {currentQuestionIndex + 1}
                                    </span>
                                    <div className="flex items-center space-x-2">
                                        <span className="px-3 py-1 bg-gradient-to-r from-primary-100 to-primary-100 text-primary-800 text-sm font-bold rounded-full">
                                            {currentQuestion.competency}
                                        </span>
                                        <span className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-sm font-bold rounded-full">
                                            {currentQuestion.level}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleFlag(currentQuestion._id)}
                                    className={`p-3 rounded-xl transition-all duration-200 ${flaggedQuestions.has(currentQuestion._id)
                                        ? 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-500 hover:bg-gradient-to-r hover:from-secondary-100 hover:to-secondary-200 hover:text-secondary-600'
                                        }`}
                                >
                                    <Flag className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-primary-50 rounded-2xl border border-gray-200">
                                <p className="text-xl text-gray-900 leading-relaxed font-medium">
                                    {currentQuestion.question}
                                </p>
                            </div>

                            <div className="space-y-4 mb-8">
                                {currentQuestion.options.map((option, index) => (
                                    <label
                                        key={index}
                                        className={`block p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${answers[currentQuestion._id] === option
                                            ? 'border-primary-500 bg-gradient-to-r from-primary-50 to-primary-50 text-primary-900 shadow-lg transform scale-[1.02]'
                                            : 'border-gray-200 hover:border-primary-300 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-50 hover:shadow-md'
                                            }`}
                                    >
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                name={currentQuestion._id}
                                                value={option}
                                                checked={answers[currentQuestion._id] === option}
                                                onChange={() => handleAnswerSelect(currentQuestion._id, option)}
                                                className="w-5 h-5 text-primary-600 mr-4"
                                            />
                                            <span className="text-lg font-medium">{option}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            {/* Answer Status Indicator */}
                            <div className="mb-6 p-4 rounded-xl border-2 border-dashed border-gray-300">
                                {answers[currentQuestion._id] ? (
                                    <div className="flex items-center text-green-700">
                                        <CheckCircle2 className="w-5 h-5 mr-2" />
                                        <span className="font-semibold ">Question answered </span>
                                    </div>
                                ) : (
                                    <div className="flex items-center text-red-700">
                                        <AlertTriangle className="w-5 h-5 mr-2" />
                                        <span className="font-semibold ">Question not answered - Required for submission </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between pt-6 border-t-2 border-gray-200">
                                <button
                                    onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                                    disabled={currentQuestionIndex === 0}
                                    className="flex items-center px-8 py-4 font-bold rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 text-lg"
                                >
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                    Previous
                                </button>

                                <div className="flex space-x-4">
                                    {currentQuestionIndex === questions.length - 1 ? (
                                        <button
                                            onClick={() => setShowReview(true)}
                                            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-10 py-4 rounded-2xl font-bold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
                                        >
                                            Final Review & Submit
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))}
                                            className="flex items-center bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-2xl font-bold hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
                                        >
                                            Next Question
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActiveAssessment;