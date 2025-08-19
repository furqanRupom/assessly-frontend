// src/pages/ForgotPassword.tsx
import { Link } from 'react-router-dom';
import ASForm from '../../components/form/ASForm';
import ASInput from '../../components/form/ASInput';
import type { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { useForgotPasswordMutation } from '../../redux/features/auth/authApi';

const ForgotPassword = () => {
    const [forgotPassword] = useForgotPasswordMutation();
    const onSubmit = async(data: FieldValues) => {
          const loadingToast = toast.loading('Processing your request...');

        try {
            const res = await forgotPassword(data).unwrap();
            toast.success(res.message, {
                id: loadingToast,
                duration: 2000,
            });
            
        } catch (error:any) {
            console.error('Forgot password error:', error);
            toast.error(error.data.message, {
                id: loadingToast,
                duration: 2000,
            });
            
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className=" rounded-xl shadow-lg p-8 ">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-primary-600 mb-2">Forgot Password</h1>
                        <p className="text-primary-400">
                            Enter your email to receive a password reset link
                        </p>
                    </div>

                    <ASForm onSubmit={onSubmit}>
                        <ASInput
                            name="email"
                            type="email"
                            label="Email Address"
                            placeholder="your@email.com"
                            icon="mail"
                            isRequired
                        />

                        <button
                            type="submit"
                            className="w-full cursor-pointer bg-primary-600 text-secondary-100 hover:bg-primary-700 focus:ring-2 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors mb-4"
                        >
                            Send Reset Link
                        </button>
                    </ASForm>

                    <div className="text-center text-sm text-primary-400">
                        Remember your password?{' '}
                        <Link to="/login" className="font-medium text-primary-600 hover:underline">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;