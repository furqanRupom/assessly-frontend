// src/pages/EmailVerify.tsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Clock } from 'lucide-react';
import ASForm from '../../components/form/ASForm';
import ASBoxInput from '../../components/form/ASBoxInput';
import { toast } from 'sonner';
import { useEmailVerifyMutation, useResendVerifyCodeMutation } from '../../redux/features/auth/authApi';
import type { FieldValues } from 'react-hook-form';

const EmailVerify = () => {
    const [countdown, setCountdown] = useState(40);
    const [canResend, setCanResend] = useState(false);
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [emailVerify] =useEmailVerifyMutation();
    const [resentOtp]= useResendVerifyCodeMutation();
    const navigate = useNavigate()

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [countdown]);

    const handleResend = async() => {
        const loadingToast = toast.loading('Resending OTP...');
         try {
            const res = await resentOtp({email}).unwrap();
            toast.success(res.message, {
                id: loadingToast,
                duration: 2000,
            });
            setCountdown(40);
            setCanResend(false);
            console.log('OTP resent successfully');
        } catch (error: any) {
            console.error('Error resending OTP:', error);
            toast.error(error.data.message, {
                id: loadingToast,
                duration: 2000,
            });
            
        }
        console.log('Resending OTP...');
        setCountdown(40);
        setCanResend(false);
    };

    const onSubmit =  async (data: FieldValues) => {
        const loadingToast = toast.loading('Verifying OTP...');
        try {
            const res = await emailVerify({email, otp: data.otp}).unwrap();
            toast.success(res.message, {
                id: loadingToast,
                duration: 2000,
            });
            localStorage.removeItem('email');
            navigate('/login');
        } catch (error:any) {
            console.error('OTP verification error:', error);
            toast.error(error.data.message, {
                id: loadingToast,
                duration: 2000,
            });
            
            
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="text-center mb-8">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-600 mb-4">
                            <Mail className="h-6 w-6 text-secondary-100" />
                        </div>
                        <h1 className="text-3xl font-bold text-primary-600 mb-2">Verify Your Email</h1>
                        <p className="text-primary-400 mb-2">
                            We've sent a 6-digit code to <span className="font-medium text-primary-600">{email}</span>
                        </p>
                        <p className="text-sm text-primary-400">
                            Enter the code below to verify your email address
                        </p>
                    </div>

                    <ASForm onSubmit={onSubmit}>
                        <ASBoxInput
                            name="otp"
                            length={6}
                            label="Verification Code"
                            isRequired
                        />

                        <button
                            type="submit"
                            className="w-full cursor-pointer bg-primary-600 text-secondary-100 hover:bg-primary-700 focus:ring-2 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors mb-6"
                        >
                            Verify Account
                        </button>
                    </ASForm>

                    <div className="text-center text-sm">
                        {canResend ? (
                            <button
                                onClick={handleResend}
                                className="font-medium text-primary-600 hover:underline focus:outline-none cursor-pointer"
                            >
                                Resend Code
                            </button>
                        ) : (
                            <div className="flex items-center justify-center text-primary-400">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>Resend code in {countdown} seconds</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 text-center text-sm text-primary-400">
                        Wrong email? <Link to="/register" className="font-medium text-primary-600 hover:underline">Go back</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailVerify;