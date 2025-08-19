// src/components/ASBoxInput.tsx
import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface IASBoxInputProps {
    name: string;
    length: number;
    label?: string;
    isRequired?: boolean;
}

const ASBoxInput: React.FunctionComponent<IASBoxInputProps> = ({
    name,
    length = 6,
    label,
    isRequired
}) => {
    const { control } = useFormContext();
    const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);

    const focusNext = (index: number, value: string) => {
        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const focusPrev = (index: number, key: string) => {
        if (key === 'Backspace' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="mb-6">
                    {label && (
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            {label}
                            {isRequired && <span className="text-red-500"> *</span>}
                        </label>
                    )}
                    <div className="flex justify-center space-x-3">
                        {Array.from({ length }).map((_, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el; }}
                                type="text"
                                maxLength={1}
                                inputMode="numeric"
                                pattern="[0-9]*"
                                className={`w-14 h-14 text-center text-3xl font-semibold bg-white border-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all
                                    ${field.value?.[index] ? 'border-primary-500 text-gray-900' : 'border-gray-300 text-gray-700'}`}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '');
                                    e.target.value = value;
                                    const currentValues = field.value?.split('') || [];
                                    currentValues[index] = value;
                                    field.onChange(currentValues.join(''));
                                    if (value) focusNext(index, value);
                                }}
                                onKeyDown={(e) => focusPrev(index, e.key)}
                                onClick={(e) => (e.target as HTMLInputElement).select()}
                                onFocus={(e) => {
                                    e.target.select();
                                    e.target.classList.add('ring-2', 'ring-primary-300');
                                }}
                                onBlur={(e) => {
                                    e.target.classList.remove('ring-2', 'ring-primary-300');
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        />
    );
};

export default ASBoxInput;