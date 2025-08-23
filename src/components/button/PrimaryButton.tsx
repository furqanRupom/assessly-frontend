import * as React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

// Button variants using CVA for better type safety and flexibility
const buttonVariants = cva(
    // Base styles
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-200/30 hover:shadow-xl hover:shadow-primary-300/40",
                secondary: "bg-primary-100 text-primary-700 hover:bg-primary-200 border border-primary-200 hover:border-primary-300",
                outline: "border border-primary-300 text-primary-700 hover:bg-primary-50 hover:border-primary-400",
                ghost: "text-primary-700 hover:bg-primary-100",
            },
            size: {
                sm: "px-4 py-2 text-sm",
                default: "px-6 py-3 text-base",
                lg: "px-8 py-4 text-lg",
                xl: "px-10 py-5 text-xl",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface IPrimaryButtonProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
    link: string;
    children: React.ReactNode;
    className?: string;
    external?: boolean;
}

const PrimaryButton = React.forwardRef<HTMLAnchorElement, IPrimaryButtonProps>(
    ({ link, children, className, variant, size, external = false, ...props }, ref) => {
        // For external links, use regular anchor tag
        if (external) {
            return (
                <a
                    href={link}
                    ref={ref}
                    className={cn(buttonVariants({ variant, size, className }))}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                >
                    {children}
                </a>
            );
        }

        // For internal links, use React Router Link
        return (
            <Link
                to={link}
                ref={ref}
                className={cn(buttonVariants({ variant, size, className }))}
                {...props}
            >
                {children}
            </Link>
        );
    }
);

PrimaryButton.displayName = "PrimaryButton";

export default PrimaryButton;

// Export the variants for external use if needed
export { buttonVariants };
