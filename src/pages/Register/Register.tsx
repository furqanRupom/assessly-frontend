// src/pages/Register.tsx
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import ASForm from '../../components/form/ASForm';
import ASInput from '../../components/form/ASInput';
import { toast } from 'sonner';
import { useRegisterMutation } from '../../redux/features/auth/authApi';
import type { FieldValues } from 'react-hook-form';

const Register = () => {
    const navigate = useNavigate();
    const [register] = useRegisterMutation();
    const onSubmit = async (data: FieldValues) => {
        const {confirmPassword, ...registerData} = data;
        if (data.password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        const loadingToast = toast.loading('Creating account...');
        try {
            const res = await register(registerData).unwrap();
            toast.success(res.message, {
                id: loadingToast,
                duration: 2000,
            });
            localStorage.setItem('email', res.data.email);
            navigate('/email-verify');


            
        } catch (error:any) {
            console.error('Registration error:', error);
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
                <div className=" rounded-xl shadow-lg p-8 ">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-primary-600 mb-2">Create Account</h1>
                        <p className="text-primary-400">Join Assessly today</p>
                    </div>

                    <ASForm onSubmit={onSubmit}>
                        <ASInput
                            name="name"
                            type="text"
                            label="Full Name"
                            placeholder="John Doe"
                            icon="user"
                            isRequired
                        />
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
                        <ASInput
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            placeholder="••••••••"
                            icon="lock"
                            hasPasswordToggle
                            isRequired
                        />

                        <div className="flex items-start mb-6">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-300 border-primary-300 rounded"
                                    required
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="font-light text-primary-600">
                                    I agree to the{' '}
                                    <Link to="/terms" className="font-medium text-primary-600 hover:underline">
                                        Terms and Conditions
                                    </Link>
                                </label>
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            className="w-full cursor-pointer bg-primary-600 text-secondary-100 hover:bg-primary-700 focus:ring-2 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Create Account
                        </motion.button>
                    </ASForm>

                    <div className="mt-6 text-center text-sm text-primary-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-primary-600 hover:underline">
                            Sign in
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;