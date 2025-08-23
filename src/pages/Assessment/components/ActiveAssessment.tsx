// components/ActiveAssessment.tsx
import React from 'react';
import { Timer, Flag, CheckCircle2, HelpCircle, ArrowLeft, ArrowRight } from 'lucide-react';
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
    isTimerActive,
    setIsTimerActive,
    flaggedQuestions,
    toggleFlag,
    showReview,
    setShowReview,
    handleSubmit
}) => {
    const currentQuestion = questions[currentQuestionIndex];
    const stats = getProgressStats(questions, answers, flaggedQuestions);

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
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-lg border-b sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-900">Digital Competency Assessment</h1>
                            <span className="ml-4 px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                                Step {selectedStep} - {assessmentData.name}
                            </span>
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className={`flex items-center px-4 py-2 rounded-lg font-bold ${timeRemaining < 300 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                                }`}>
                                <Timer className="w-4 h-4 mr-2" />
                                {formatTime(timeRemaining)}
                            </div>
                            <button
                                onClick={() => setShowReview(true)}
                                className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                            >
                                Review Answers
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                                />
                            </div>
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                            {currentQuestionIndex + 1} of {questions.length}
                        </div>
                    </div>

                    <div className="flex items-center space-x-6 mt-4 text-sm">
                        <span className="flex items-center text-green-600 font-medium">
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Answered: {stats.answered}
                        </span>
                        <span className="flex items-center text-secondary-600 font-medium">
                            <Flag className="w-4 h-4 mr-1" />
                            Flagged: {stats.flagged}
                        </span>
                        <span className="flex items-center text-gray-600 font-medium">
                            <HelpCircle className="w-4 h-4 mr-1" />
                            Remaining: {stats.remaining}
                        </span>
                    </div>
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
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <span className="text-2xl font-bold text-gray-900 mr-4">
                                        Question {currentQuestionIndex + 1}
                                    </span>
                                    <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                                        {currentQuestion.competency} - {currentQuestion.level}
                                    </span>
                                </div>
                                <button
                                    onClick={() => toggleFlag(currentQuestion._id)}
                                    className={`p-2 rounded-lg transition-colors ${flaggedQuestions.has(currentQuestion._id)
                                            ? 'bg-secondary-100 text-secondary-600'
                                            : 'bg-gray-100 text-gray-500 hover:bg-secondary-50 hover:text-secondary-600'
                                        }`}
                                >
                                    <Flag className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="mb-8">
                                <p className="text-xl text-gray-900 leading-relaxed font-medium">
                                    {currentQuestion.question}
                                </p>
                            </div>

                            <div className="space-y-3 mb-8">
                                {currentQuestion.options.map((option, index) => (
                                    <label
                                        key={index}
                                        className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${answers[currentQuestion._id] === option
                                                ? 'border-primary-500 bg-primary-50 text-primary-900'
                                                : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                                            }`}
                                    >
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                name={currentQuestion._id}
                                                value={option}
                                                checked={answers[currentQuestion._id] === option}
                                                onChange={() => handleAnswerSelect(currentQuestion._id, option)}
                                                className="w-4 h-4 text-primary-600 mr-4"
                                            />
                                            <span className="text-lg">{option}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            <div className="flex justify-between">
                                <button
                                    onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                                    disabled={currentQuestionIndex === 0}
                                    className="flex items-center px-6 py-3 font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 hover:bg-gray-100"
                                >
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                    Previous
                                </button>

                                <div className="flex space-x-3">
                                    {currentQuestionIndex === questions.length - 1 ? (
                                        <button
                                            onClick={() => setShowReview(true)}
                                            className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                                        >
                                            Review & Submit
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))}
                                            className="flex items-center bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                                        >
                                            Next
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