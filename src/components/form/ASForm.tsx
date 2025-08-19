import * as React from 'react';
import { type FieldValues, FormProvider, type SubmitHandler, useForm } from "react-hook-form"

interface IFormConfig {
    defaultValues?: Record<string, any>;
}
interface IASFormFormProps {
    onSubmit: SubmitHandler<FieldValues>;
    children: React.ReactNode;
    className?: string;
}

const ASForm: React.FunctionComponent<IASFormFormProps & IFormConfig> = ({
    onSubmit,
    children,
    defaultValues,
    className = ""
}) => {
    const formConfig: IFormConfig = {};

    if (defaultValues) {
        formConfig['defaultValues'] = defaultValues;
    }

    const methods = useForm(formConfig);
    const { handleSubmit } = methods;

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={` ${className}`}
            >
                {children}
            </form>
        </FormProvider>
    );
};

export default ASForm;
