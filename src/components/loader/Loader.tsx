import { motion } from 'framer-motion';

// Main Assessment Loader with Shield Icon
export const AssessmentLoader = ({
    size = 'md',
}: {
    size?: 'sm' | 'md' | 'lg',
    text?: string
}) => {
    const sizes = {
        sm: { container: 'w-8 h-8', icon: 'w-4 h-4' },
        md: { container: 'w-12 h-12', icon: 'w-6 h-6' },
        lg: { container: 'w-16 h-16', icon: 'w-8 h-8' }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <motion.div
                className={`${sizes[size].container} rounded-full bg-primary-600 flex items-center justify-center relative overflow-hidden`}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
                {/* Animated Background Ring */}
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary-300"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />

                {/* Shield Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`${sizes[size].icon} text-white z-10`}>
                    <path fill="currentColor" d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm1.65-2.65L11.5 12.2V9h1v2.79l1.85 1.85-.7.71z" />
                </svg>
            </motion.div>

         
        </div>
    );
};

// Simple Dot Loader
export const DotLoader = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
    const dotSizes = {
        sm: 'w-1.5 h-1.5',
        md: 'w-2 h-2',
        lg: 'w-3 h-3'
    };

    return (
        <div className="flex items-center justify-center gap-1">
            {[0, 1, 2].map((index) => (
                <motion.div
                    key={index}
                    className={`${dotSizes[size]} bg-primary-600 rounded-full`}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: index * 0.2
                    }}
                />
            ))}
        </div>
    );
};

// Pulse Ring Loader
export const PulseLoader = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
    const ringSizes = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    return (
        <div className={`${ringSizes[size]} relative flex items-center justify-center`}>
            {[0, 1, 2].map((index) => (
                <motion.div
                    key={index}
                    className="absolute inset-0 rounded-full border-2 border-primary-600"
                    animate={{
                        scale: [0, 1],
                        opacity: [1, 0]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.5
                    }}
                />
            ))}
            <div className={`w-2 h-2 bg-primary-600 rounded-full`} />
        </div>
    );
};

// Spinning Ring Loader
export const SpinningRing = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
    const ringSizes = {
        sm: 'w-6 h-6 border-2',
        md: 'w-8 h-8 border-2',
        lg: 'w-12 h-12 border-4'
    };

    return (
        <motion.div
            className={`${ringSizes[size]} border-primary-200 border-t-primary-600 rounded-full`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
    );
};

// Progress Bar Loader
export const ProgressLoader = ({
    progress = 0,
    text = 'Loading...',
    animated = true
}: {
    progress?: number,
    text?: string,
    animated?: boolean
}) => {
    return (
        <div className="w-full max-w-sm mx-auto space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-secondary-700">{text}</span>
                <span className="text-sm text-secondary-500">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-primary-200 rounded-full h-2 overflow-hidden">
                <motion.div
                    className="h-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                        width: `${progress}%`,
                        ...(animated && {
                            backgroundPosition: ['0% 0%', '100% 0%']
                        })
                    }}
                    transition={{
                        width: { duration: 0.5 },
                        ...(animated && {
                            backgroundPosition: {
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear"
                            }
                        })
                    }}
                    style={animated ? { backgroundSize: '200% 100%' } : {}}
                />
            </div>
        </div>
    );
};

// Card Skeleton Loader
export const CardSkeleton = () => {
    return (
        <div className="bg-white rounded-lg border border-primary-200 p-6 space-y-4">
            <div className="flex items-center space-x-4">
                <motion.div
                    className="w-12 h-12 bg-primary-200 rounded-lg"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                <div className="space-y-2 flex-1">
                    <motion.div
                        className="h-4 bg-primary-200 rounded w-3/4"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                        className="h-3 bg-secondary-200 rounded w-1/2"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                    />
                </div>
            </div>
            <motion.div
                className="h-32 bg-primary-100 rounded"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            />
        </div>
    );
};

// Inline Text Loader
export const InlineLoader = ({ text = 'Loading' }: { text?: string }) => {
    return (
        <div className="flex items-center gap-2">
            <DotLoader size="sm" />
            <motion.span
                className="text-sm text-secondary-600"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                {text}
            </motion.span>
        </div>
    );
};

