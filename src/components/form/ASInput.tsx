import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface IASInputProps {
    name: string;
    placeholder?: string;
    type?: string;
    hasPasswordToggle?: boolean;
    isRequired?: boolean;
    isReadOnly?: boolean;
    label?: string;
    icon?: 'user' | 'mail' | 'lock' | 'at';
    defaultValue?: string;
}

const ASInput: React.FunctionComponent<IASInputProps> = ({
    name,
    placeholder,
    type = "text",
    hasPasswordToggle,
    isRequired,
    isReadOnly,
    label,
    icon,
    defaultValue = ""
}) => {
    const { control } = useFormContext();
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible((prev) => !prev);

    const inputType =
        hasPasswordToggle && type === 'password'
            ? (isVisible ? 'text' : 'password')
            : type;

    const getIcon = () => {
        switch (icon) {
            case 'user':
                return <User className="h-5 w-5 text-gray-500" />;
            case 'mail':
                return <Mail className="h-5 w-5 text-gray-500" />;
            case 'lock':
                return <Lock className="h-5 w-5 text-gray-500" />;
            case 'at':
                return <span className="text-gray-500 font-medium">@</span>;
            default:
                return null;
        }
    };

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
                <div className="mb-4">
                    {label && (
                        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                            {label}
                            {isRequired && <span className="text-red-500"> *</span>}
                        </label>
                    )}
                    <div className="relative">
                        {icon && (
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {getIcon()}
                            </div>
                        )}
                        <input
                            {...field}
                            id={name}
                            type={inputType}
                            placeholder={placeholder}
                            required={isRequired}
                            readOnly={isReadOnly}
                            className={`block w-full ${icon ? 'pl-10' : 'pl-3'} pr-${hasPasswordToggle ? '10' : '3'} py-2 bg-white border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition`}
                            value={field.value || ''}
                        />
                        {hasPasswordToggle && type === 'password' && (
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                                onClick={toggleVisibility}
                            >
                                {isVisible ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        )}
                    </div>
                </div>
            )}
        />
    );
};

export default ASInput;