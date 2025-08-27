import React, { useState } from 'react';
import { Clock, CheckCircle2, AlertCircle, ArrowLeft, Award, Play, XCircle, Verified, X } from 'lucide-react';
import type { AssessmentStep } from '@/interfaces/assessment';

interface AssessmentInstructionsProps {
    assessmentData: AssessmentStep;
    selectedStep: number;
    setAssessmentState: (state: 'selection' | 'instructions' | 'active' | 'completed') => void;
    startAssessment: () => void;
}

const AssessmentInstructions: React.FC<AssessmentInstructionsProps> = ({
    assessmentData,
    selectedStep,
    setAssessmentState,
    startAssessment
}) => {
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [confirmedReady, setConfirmedReady] = useState(false);

    const canStartAssessment = agreedToTerms && confirmedReady;

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-50 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Award className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-4">
                            Assessment Instructions
                        </h1>
                        <div className="inline-flex items-center bg-gradient-to-r from-primary-100 to-primary-100 px-6 py-3 rounded-full">
                            <span className="text-lg font-semibold text-primary-800">
                                {assessmentData.name} - Step {selectedStep}
                            </span>
                        </div>
                    </div>

                    {/* Critical Warning Section */}
                    <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
                        <div className="flex items-start">
                            <XCircle className="w-8 h-8 text-red-600 mr-4 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold text-red-800 mb-3">
                                     MANDATORY REQUIREMENTS - READ CAREFULLY
                                </h3>
                                <ul className="space-y-2 text-red-700 font-medium">
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        <span>You MUST answer ALL {assessmentData.questions} questions to submit the assessment</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        <span>Incomplete assessments will NOT be accepted - no exceptions</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        <span>You need minimum 75% score to receive certification</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        <span>Failing candidates will NOT receive any certificate</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-gradient-to-br from-primary-50 to-indigo-50 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                <Clock className="w-6 h-6 mr-2 text-primary-600" />
                                Time & Format Details
                            </h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span><strong>Duration:</strong> {assessmentData.duration} minutes (strictly timed)</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span><strong>Questions:</strong> {assessmentData.questions} multiple choice (all mandatory)</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span>Navigate between questions freely</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span>Flag difficult questions for review</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                <AlertCircle className="w-6 h-6 mr-2 text-amber-600" />
                                Strict Assessment Rules
                            </h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start">
                                    <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span><strong>No second chances:</strong> Once submitted, cannot be changed</span>
                                </li>
                                <li className="flex items-start">
                                    <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span><strong>Auto-submit:</strong> Assessment ends when time expires</span>
                                </li>
                                <li className="flex items-start">
                                    <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span><strong>Connection required:</strong> Stable internet mandatory</span>
                                </li>
                                <li className="flex items-start">
                                    <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span><strong>No external help:</strong> Resources/assistance prohibited</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 mb-8">
                        <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
                            <Award className="w-5 h-5 mr-2" />
                            Certification Requirements & Scoring
                        </h3>
                        <p className="text-green-700 mb-4 font-medium">
                            <strong>Competency Levels Tested:</strong> {assessmentData.levels.join(', ')}
                        </p>
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
                                <div className="text-red-600 font-semibold flex justify-center items-center gap-1"><X size={16} /> <span >FAIL</span></div>
                                <div className="text-xs text-red-500 mt-1">No Certificate</div>
                            </div>
                        </div>
                    </div>

                    {/* Confirmation Checkboxes */}
                    <div className="bg-gray-50 rounded-2xl p-6 mb-8 border-2 border-gray-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Confirmation Required</h3>
                        <div className="space-y-4">
                            <label className="flex items-start cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className="w-5 h-5 text-primary-600 rounded mr-3 mt-0.5"
                                />
                                <span className="text-gray-700 font-medium">
                                    I understand and agree to all the assessment rules and requirements listed above.
                                    I acknowledge that I must answer ALL questions to submit the assessment.
                                </span>
                            </label>
                            <label className="flex items-start cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={confirmedReady}
                                    onChange={(e) => setConfirmedReady(e.target.checked)}
                                    className="w-5 h-5 text-primary-600 rounded mr-3 mt-0.5"
                                />
                                <span className="text-gray-700 font-medium">
                                    I confirm that I am ready to begin the assessment and have a stable internet connection.
                                    I understand that failing candidates will not receive certification.
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => setAssessmentState('selection')}
                            className="flex items-center px-6 py-3 text-gray-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Selection
                        </button>
                        <button
                            onClick={startAssessment}
                            disabled={!canStartAssessment}
                            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center ${canStartAssessment
                                ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 shadow-lg hover:shadow-xl transform hover:scale-105'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            {canStartAssessment ? 'Start Assessment' : 'Complete Confirmations Above'}
                            {canStartAssessment && <Play className="w-5 h-5 ml-2" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssessmentInstructions;
