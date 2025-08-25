// components/AssessmentSelection.tsx
import React from 'react';
import { BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';
import { ASSESSMENT_STEPS } from '@/constants/assessmentData';

interface AssessmentSelectionProps {
    selectedStep: number;
    setSelectedStep: (step: number) => void;
    setAssessmentState: (state: 'selection' | 'instructions' | 'active' | 'completed') => void;
}

const AssessmentSelection: React.FC<AssessmentSelectionProps> = ({
    selectedStep,
    setSelectedStep,
    setAssessmentState
}) => {
    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="text-center mb-12">
         
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Assessment Level</h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Select the appropriate step based on your current digital skills level. Each step builds upon the previous one.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
                {Object.entries(ASSESSMENT_STEPS).map(([step, info]) => {
                    const stepNumber = parseInt(step);
                    return (
                        <div
                            key={step}
                            onClick={() => setSelectedStep(stepNumber)}
                            className={`cursor-pointer rounded-2xl p-8 transition-all duration-300 ${selectedStep === stepNumber
                                    ? 'bg-primary-600 text-white shadow-xl scale-105'
                                    : 'bg-white text-gray-900 shadow-lg hover:shadow-xl hover:scale-102'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${selectedStep === stepNumber ? 'bg-primary-500' : 'bg-primary-100 text-primary-600'
                                    }`}>
                                    {step}
                                </div>
                                {selectedStep === stepNumber && <CheckCircle2 className="w-6 h-6" />}
                            </div>

                            <h3 className="text-xl font-bold mb-2">{info.name}</h3>
                            <p className={`text-sm mb-4 ${selectedStep === stepNumber ? 'text-primary-100' : 'text-gray-600'
                                }`}>
                                Levels: {info.levels.join(', ')}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className={`text-center p-3 rounded-lg ${selectedStep === stepNumber ? 'bg-primary-500' : 'bg-gray-50'
                                    }`}>
                                    <div className="text-2xl font-bold">{info.duration}m</div>
                                    <div className={`text-xs ${selectedStep === stepNumber ? 'text-primary-100' : 'text-gray-600'
                                        }`}>Duration</div>
                                </div>
                                <div className={`text-center p-3 rounded-lg ${selectedStep === stepNumber ? 'bg-primary-500' : 'bg-gray-50'
                                    }`}>
                                    <div className="text-2xl font-bold">{info.questions}</div>
                                    <div className={`text-xs ${selectedStep === stepNumber ? 'text-primary-100' : 'text-gray-600'
                                        }`}>Questions</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="text-center">
                <button
                    onClick={() => setAssessmentState('instructions')}
                    className="bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-700 transition-colors duration-200 flex items-center mx-auto"
                >
                    Continue to Instructions
                    <ArrowRight className="w-5 h-5 ml-2" />
                </button>
            </div>
        </div>
    );
};

export default AssessmentSelection;