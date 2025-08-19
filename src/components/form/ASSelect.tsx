import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ChevronDown } from 'lucide-react';

interface IASSelectProps {
    name: string;
    options: Array<{ value: string | number; label: string }>;
    placeholder?: string;
    isRequired?: boolean;
    isReadOnly?: boolean;
    label?: string;
    defaultValue?: string | number;
    icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
}

const ASSelect: React.FunctionComponent<IASSelectProps> = ({
    name,
    options,
    placeholder,
    isRequired,
    isReadOnly,
    label,
    defaultValue = "",
    icon
}) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
                <div className="mb-4">
                    {label && (
                        <label htmlFor={name} className="block text-sm font-medium text-secondary-100 mb-1">
                            {label}
                        </label>
                    )}
                    <div className="relative">
                        {icon && (
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {React.cloneElement(icon, {
                                    className: "h-5 w-5 text-secondary-300"
                                })}
                            </div>
                        )}
                        <select
                            {...field}
                            id={name}
                            required={isRequired}
                            disabled={isReadOnly}
                            className={`block w-full ${icon ? 'pl-10' : 'pl-3'} pr-10 py-2 bg-primary-500 border border-primary-400 rounded-lg text-secondary-100 focus:ring-2 focus:ring-secondary-300 focus:outline-none focus:border-transparent appearance-none`}
                            value={field.value || ''}
                        >
                            {placeholder && (
                                <option value="" disabled hidden>
                                    {placeholder}
                                </option>
                            )}
                            {options.map((option) => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                    className="bg-primary-600 text-secondary-100"
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <ChevronDown className="h-5 w-5 text-secondary-300" />
                        </div>
                    </div>
                </div>
            )}
        />
    );
};

export default ASSelect;