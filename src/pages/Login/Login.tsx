// src/pages/Login.tsx
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import ASForm from '../../components/form/ASForm';
import ASInput from '../../components/form/ASInput';
import { useDispatch } from 'react-redux';
import {toast} from 'sonner'
import { useLoginMutation } from '../../redux/features/auth/authApi';
import { verifyToken, type DecodedToken } from '../../utils/verifyToken';
import { setUser, type IUser } from '../../redux/features/auth/authSlice';
import type { FieldValues } from 'react-hook-form';

const Login =  () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login] = useLoginMutation();
    const onSubmit = async (data: FieldValues) => {
        const loadingToast = toast.loading('Logging in...');
        try {
            const res = await login(data).unwrap();
            const user = verifyToken(res?.data?.accessToken) as DecodedToken
            dispatch(setUser({user:user,token:res?.data?.accessToken}));
            toast.success(res.message,{
                id: loadingToast,
                duration:2000
            })
            navigate(`/${user.role}/dashboard`);
            
        } catch (error: any) {
            if (error.data?.message?.includes('OTP')) {
                localStorage.removeItem('email');
                localStorage.setItem('email', data.email);
                navigate('/email-verify');
            }
            toast.error(error.data.message, {
                id: loadingToast,
                duration: 2000,
            });
            
        }

    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="rounded-xl shadow-lg p-8 ">
                    <div className="text-center mb-8">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-600 mb-4">
                            <Lock className="h-6 w-6 text-secondary-100" />
                        </div>
                        <h1 className="text-3xl font-bold text-primary-600 mb-2">Welcome Back</h1>
                        <p className="text-primary-400">Sign in to your Assessly account</p>
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
                        <ASInput
                            name="password"
                            type="password"
                            label="Password"
                            placeholder="••••••••"
                            icon="lock"
                            hasPasswordToggle
                            isRequired
                        />

                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-300 border-primary-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-primary-600">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <Link to="/forgot-password" className="font-medium text-primary-600 hover:text-primary-700">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            className="w-full cursor-pointer bg-primary-600 text-secondary-100 hover:bg-primary-700 focus:ring-2 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center transition-colors shadow-md"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Sign in
                        </motion.button>
                    </ASForm>

                    <div className="mt-6 text-center text-sm text-primary-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-primary-600 hover:underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;