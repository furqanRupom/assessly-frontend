import React from 'react';
import { CheckCircle2, Award, ArrowRight, XCircle, AlertCircle, Clock, Verified, X } from 'lucide-react';
import type { AssessmentStep, Question } from '@/interfaces/assessment';
import { calculateScore, formatTime } from '@/utils/assessment';

interface AssessmentCompletionProps {
    questions: Question[];
    assessmentData: AssessmentStep;
    assessmentId?: string;
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
    assessmentId,
    setCurrentQuestionIndex,
    setAnswers,
    setFlaggedQuestions,
    setShowReview
}) => {
    const score = calculateScore(questions, answers);
    const timeSpent = assessmentData.duration * 60 - timeRemaining;
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    // Check if all questions were answered
    const allQuestionsAnswered = Object.keys(answers).length === questions.length;

    // Check if minimum score requirement is met
    const minScoreRequirement = 75;
    const passedAssessment = score >= minScoreRequirement;

    // Check if time was completed (not ran out)
    const timeCompleted = timeRemaining > 0;

    const handleDownloadPdf = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/student/generate-certificate/${assessmentId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to generate PDF');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `certificate-${assessmentId}.pdf`;
            document.body.appendChild(a);
            a.click();

            setTimeout(() => {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 100);

        } catch (err) {
            console.error('Failed to download PDF:', err);
        } finally {
            setIsLoading(false);
        }
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
    const canDownloadCertificate = passedAssessment && allQuestionsAnswered;

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Completed!</h1>
                    <p className="text-lg text-gray-600">
                        Thank you for completing the {assessmentData.name}
                    </p>
                </div>

                {/* Requirement Validation Section */}
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
                    <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                        <XCircle className="w-6 h-6 mr-2" />
                        Assessment Requirements Status
                    </h3>

                    <div className="space-y-3">
                        {/* All Questions Answered Check */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                {allQuestionsAnswered ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3" />
                                ) : (
                                    <XCircle className="w-5 h-5 text-red-600 mr-3" />
                                )}
                                <span className="font-medium">All questions answered</span>
                            </div>
                            <span className={`font-semibold ${allQuestionsAnswered ? 'text-green-700' : 'text-red-700'}`}>
                                {Object.keys(answers).length}/{questions.length}
                            </span>
                        </div>

                        {/* Minimum Score Requirement Check */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                {passedAssessment ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3" />
                                ) : (
                                    <XCircle className="w-5 h-5 text-red-600 mr-3" />
                                )}
                                <span className="font-medium">Minimum {minScoreRequirement}% score achieved</span>
                            </div>
                            <span className={`font-semibold ${passedAssessment ? 'text-green-700' : 'text-red-700'}`}>
                                {score}%
                            </span>
                        </div>

                        {/* Time Completion Check */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                {timeCompleted ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3" />
                                ) : (
                                    <AlertCircle className="w-5 h-5 text-amber-600 mr-3" />
                                )}
                                <span className="font-medium">Time management</span>
                            </div>
                            <span className={`font-semibold ${timeCompleted ? 'text-green-700' : 'text-amber-700'}`}>
                                {timeCompleted ? 'Completed' : 'Time expired'}
                            </span>
                        </div>
                    </div>

                    {/* Overall Status */}
                    <div className="mt-4 p-4 bg-white rounded-lg border">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-lg">Overall Status:</span>
                            <span className={`font-bold text-lg ${canDownloadCertificate ? 'text-green-700' : 'text-red-700'}`}>
                                {canDownloadCertificate ? 'QUALIFIED FOR CERTIFICATION' : 'NOT QUALIFIED'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Score Summary Section */}
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8 mb-8">
                    <h3 className="text-xl font-bold text-center text-gray-900 mb-6">Assessment Results</h3>
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

                {/* Certification Level Section */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                        <Award className="w-6 h-6 mr-2 text-secondary-600" />
                        Your Certification Level
                    </h3>
                    <div className={`w-fit  px-6 py-3 rounded-full text-lg font-bold mx-auto mb-4 ${score >= 75 ? 'bg-primary-100 text-primary-800 ' :
                        score >= (selectedStep === 1 ? 25 : 50) ? 'bg-secondary-100 text-secondary-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                        {certifiedLevel}
                    </div>
                    <p className="text-gray-600 text-center max-w-2xl mx-auto">
                        {passedAssessment && allQuestionsAnswered ?
                            `Congratulations! You've demonstrated strong digital competency${selectedStep < 3 ? ' and can proceed to the next step.' : '.'}` :
                            !allQuestionsAnswered ?
                                'Assessment incomplete. You must answer all questions to qualify for certification.' :
                                score >= (selectedStep === 1 ? 25 : 50) ?
                                    'You have basic competency but did not meet the minimum score requirement for certification.' :
                                    'Consider reviewing the material and retaking the assessment to improve your score.'
                        }
                    </p>
                </div>

                {/* Scoring Requirements Reference */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 mb-8">
                    <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center justify-center">
                        <Award className="w-5 h-5 mr-2" />
                        Certification Requirements
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="text-center p-4 bg-white rounded-xl border-2 border-green-300">
                            <div className="font-bold text-green-700 text-lg mb-1">75-100%</div>
                            <div className="text-green-600 font-semibold inline-flex items-center justify-center gap-2"><Verified /> PASS - Full Certification</div>
                            <div className="text-xs text-green-500 mt-1">Certificate Awarded</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-xl border-2 border-amber-300">
                            <div className="font-bold text-amber-700 text-lg mb-1">50-74%</div>
                            <div className="text-amber-600 font-semibold inline-flex justify-center items-center gap-2"><AlertCircle /> NEEDS IMPROVEMENT</div>
                            <div className="text-xs text-amber-500 mt-1">No Certificate</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-xl border-2 border-red-300">
                            <div className="font-bold text-red-700 text-lg mb-1">Below 50%</div>
                            <div className="text-red-600 font-semibold flex justify-center items-center gap-1"><X size={16} /> <span>FAIL</span></div>
                            <div className="text-xs text-red-500 mt-1">No Certificate</div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
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
                        onClick={() => setAssessmentState('selection')}
                        className="bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                    >
                        Take Another Assessment
                    </button>

                    <button
                        onClick={handleDownloadPdf}
                        disabled={!canDownloadCertificate || isLoading}
                        className={`px-8 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center ${canDownloadCertificate
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        {isLoading ? 'Generating...' : 'Download Certificate'}
                    </button>
                </div>

                {/* Detailed Assessment Summary */}
                <div className="bg-primary-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-primary-900 mb-4">Assessment Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                            <span className="font-medium">Time Spent:</span>
                            <span>{formatTime(timeSpent)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Total Questions:</span>
                            <span>{questions.length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Correct Answers:</span>
                            <span>{Math.round(questions.length * score / 100)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Incorrect Answers:</span>
                            <span>{questions.length - Math.round(questions.length * score / 100)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Step Completed:</span>
                            <span>{selectedStep}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Time Remaining:</span>
                            <span>{formatTime(timeRemaining)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssessmentCompletion;