// Assessment.tsx
import React, { useState, useEffect } from 'react';

import AssessmentSelection from './components/AssessmentSelection';
import AssessmentInstructions from './components/AssessmentInstructionts';
import ActiveAssessment from './components/ActiveAssessment';
import AssessmentCompletion from './components/AssessmentCompletion';
import { useStartAssessmentMutation, useSubmitAssessmentMutation } from '@/redux/features/assessment/assesmentApi';
import { useGetQuestionsQuery } from '@/redux/features/assessment/questionApi';
import { ASSESSMENT_STEPS } from '@/constants/assessmentData';
import type { AssessmentState, Question } from '@/interfaces/assessment';

const Assessment: React.FC = () => {
    const [assessmentState, setAssessmentState] = useState<AssessmentState['assessmentState']>('selection');
    const [selectedStep, setSelectedStep] = useState<number>(1);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [timeRemaining, setTimeRemaining] = useState<number>(0);
    const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
    const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
    const [showReview, setShowReview] = useState<boolean>(false);
    const [assessmentId, setAssessmentId] = useState<string>('');
    const [questions, setQuestions] = useState<Question[]>([]);

    // RTK Query hooks
    const [startAssessment, { isLoading: isStarting }] = useStartAssessmentMutation();
    const [submitAssessment, { isLoading: isSubmitting }] = useSubmitAssessmentMutation();

    // Get questions data when we have question IDs
    const { data: questionsData, isLoading: isLoadingQuestions } = useGetQuestionsQuery(
        assessmentId ? questions.map(q => q._id) : [],
        { skip: !assessmentId || questions.length === 0 }
    );

    // Timer effect
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isTimerActive && timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining(time => {
                    if (time <= 1) {
                        setIsTimerActive(false);
                        handleSubmit();
                        return 0;
                    }
                    return time - 1;
                });
            }, 1000);
        } else if (timeRemaining === 0) {
            setIsTimerActive(false);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isTimerActive, timeRemaining]);

    // Update questions when data is fetched
    useEffect(() => {
        if (questionsData) {
            setQuestions(questionsData);
        }
    }, [questionsData]);

    const handleStartAssessment = async () => {
        try {
            const result = await startAssessment(selectedStep).unwrap();
            setAssessmentId(result._id);
            setQuestions(result.questions as unknown as Question[]); // This will be replaced by actual questions data
            setAssessmentState('active');
            setTimeRemaining(ASSESSMENT_STEPS[selectedStep].duration * 60);
            setIsTimerActive(true);
        } catch (error) {
            console.error('Failed to start assessment:', error);
            // Handle error (e.g., show notification)
        }
    };

    const handleAnswerSelect = (questionId: string, answer: string) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const toggleFlag = (questionId: string) => {
        setFlaggedQuestions(prev => {
            const newSet = new Set(prev);
            if (newSet.has(questionId)) {
                newSet.delete(questionId);
            } else {
                newSet.add(questionId);
            }
            return newSet;
        });
    };

    const handleSubmit = async () => {
        setIsTimerActive(false);

        try {
            const answerArray = Object.entries(answers).map(([questionId, answer]) => ({
                questionId,
                answer
            }));

            const result = await submitAssessment({
                assessmentId,
                answers: answerArray
            }).unwrap();

            setAssessmentState('completed');
        } catch (error) {
            console.error('Failed to submit assessment:', error);
            // Handle error (e.g., show notification)
        }
    };

    if (isStarting || isLoadingQuestions) {
        return <div className="min-h-screen bg-primary-50 flex items-center justify-center">Loading assessment...</div>;
    }

    return (
        <div className="min-h-screen bg-primary-50">
            {assessmentState === 'selection' && (
                <AssessmentSelection
                    selectedStep={selectedStep}
                    setSelectedStep={setSelectedStep}
                    setAssessmentState={setAssessmentState}
                />
            )}

            {assessmentState === 'instructions' && (
                <AssessmentInstructions
                    assessmentData={ASSESSMENT_STEPS[selectedStep]}
                    selectedStep={selectedStep}
                    setAssessmentState={setAssessmentState}
                    startAssessment={handleStartAssessment}
                />
            )}

            {assessmentState === 'active' && questions.length > 0 && (
                <ActiveAssessment
                    questions={questions}
                    assessmentData={ASSESSMENT_STEPS[selectedStep]}
                    selectedStep={selectedStep}
                    currentQuestionIndex={currentQuestionIndex}
                    setCurrentQuestionIndex={setCurrentQuestionIndex}
                    answers={answers}
                    handleAnswerSelect={handleAnswerSelect}
                    timeRemaining={timeRemaining}
                    isTimerActive={isTimerActive}
                    setIsTimerActive={setIsTimerActive}
                    flaggedQuestions={flaggedQuestions}
                    toggleFlag={toggleFlag}
                    showReview={showReview}
                    setShowReview={setShowReview}
                    handleSubmit={handleSubmit}
                />
            )}

            {assessmentState === 'completed' && (
                <AssessmentCompletion
                    questions={questions}
                    assessmentData={ASSESSMENT_STEPS[selectedStep]}
                    selectedStep={selectedStep}
                    answers={answers}
                    timeRemaining={timeRemaining}
                    setAssessmentState={setAssessmentState}
                    setSelectedStep={setSelectedStep}
                    setCurrentQuestionIndex={setCurrentQuestionIndex}
                    setAnswers={setAnswers}
                    setFlaggedQuestions={setFlaggedQuestions}
                    setShowReview={setShowReview}
                />
            )}
        </div>
    );
};

export default Assessment;