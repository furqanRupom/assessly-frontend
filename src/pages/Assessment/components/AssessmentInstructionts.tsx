// components/AssessmentInstructions.tsx
import React from 'react';
import { Clock, CheckCircle2, AlertCircle, ArrowLeft, Award, Play } from 'lucide-react';
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
    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Assessment Instructions</h1>
                    <p className="text-lg text-gray-600">
                        {assessmentData.name} - Step {selectedStep}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <Clock className="w-6 h-6 mr-2 text-primary-600" />
                            Time & Format
                        </h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span>Duration: {assessmentData.duration} minutes</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span>Questions: {assessmentData.questions} multiple choice</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span>You can navigate between questions freely</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span>Flag questions for review</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <AlertCircle className="w-6 h-6 mr-2 text-primary-600" />
                            Assessment Rules
                        </h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <AlertCircle className="w-5 h-5 text-secondary-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span>Once submitted, answers cannot be changed</span>
                            </li>
                            <li className="flex items-start">
                                <AlertCircle className="w-5 h-5 text-secondary-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span>Assessment will auto-submit when time expires</span>
                            </li>
                            <li className="flex items-start">
                                <AlertCircle className="w-5 h-5 text-secondary-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span>Ensure stable internet connection</span>
                            </li>
                            <li className="flex items-start">
                                <AlertCircle className="w-5 h-5 text-secondary-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span>No external resources allowed during assessment</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="bg-primary-50 rounded-xl p-6 mb-8">
                    <h3 className="text-lg font-bold text-primary-900 mb-3 flex items-center">
                        <Award className="w-5 h-5 mr-2" />
                        Certification Levels
                    </h3>
                    <p className="text-primary-800 mb-4">
                        Based on your performance, you'll receive certification for competency levels: {assessmentData.levels.join(', ')}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="text-center p-3 bg-white rounded-lg">
                            <div className="font-bold text-green-600">75-100%</div>
                            <div className="text-gray-600">Full Certification</div>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                            <div className="font-bold text-primary-600">25-74%</div>
                            <div className="text-gray-600">Partial Competency</div>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                            <div className="font-bold text-secondary-600">Below 25%</div>
                            <div className="text-gray-600">Needs Improvement</div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between">
                    <button
                        onClick={() => setAssessmentState('selection')}
                        className="flex items-center px-6 py-3 text-gray-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Selection
                    </button>
                    <button
                        onClick={startAssessment}
                        className="bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors flex items-center"
                    >
                        Start Assessment
                        <Play className="w-5 h-5 ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssessmentInstructions;