import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock } from 'lucide-react';
import ASForm from '../../components/form/ASForm';
import ASInput from '../../components/form/ASInput';
import { useResetPasswordMutation } from '../../redux/features/auth/authApi';
import { toast } from 'sonner';
import type { FieldValues } from 'react-hook-form';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const navigate = useNavigate();

    const onSubmit = async (data: FieldValues) => {
        const loadingToast = toast.loading('Resetting your password...');
        if (data.newPassword !== data.confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        try {
            const resetData = {
                token: token || '',
                newPassword: data.newPassword,
                userId: userId || ''
            };

            const response = await resetPassword(resetData).unwrap();
            console.log(response)
            toast.success(response.message || 'Password reset successfully',{
                id: loadingToast,
            });
            navigate('/login');
        } catch (error: any) {
            toast.error(error.data?.message || 'Failed to reset password',{
                id: loadingToast,
            });
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="rounded-xl shadow-lg p-8 ">
                    <div className="text-center mb-8">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-600 mb-4">
                            <Lock className="h-6 w-6 text-secondary-100" />
                        </div>
                        <h1 className="text-3xl font-bold text-primary-600 mb-2">Reset Password</h1>
                        <p className="text-primary-400">
                            Create a new password for your account
                        </p>
                    </div>

                    <ASForm onSubmit={onSubmit}>
                        <ASInput
                            name="newPassword"
                            type="password"
                            label="New Password"
                            placeholder="••••••••"
                            icon="lock"
                            hasPasswordToggle
                            isRequired
                           
                        />
                        <ASInput
                            name="confirmPassword"
                            type="password"
                            label="Confirm New Password"
                            placeholder="••••••••"
                            icon="lock"
                            hasPasswordToggle
                            isRequired
                        />

                        <div className="mb-6 text-sm text-primary-400">
                            <p>Your password must:</p>
                            <ul className="list-disc pl-5 mt-1 space-y-1">
                                <li>Be at least 8 characters</li>
                                <li>Contain at least one number</li>
                                <li>Contain at least one special character</li>
                            </ul>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full cursor-pointer bg-primary-600 text-secondary-100 hover:bg-primary-700 focus:ring-2 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors mb-4 disabled:opacity-70"
                        >
                            {isLoading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword;