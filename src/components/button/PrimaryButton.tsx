import * as React from 'react';
import { Link } from 'react-router-dom';

interface IPrimaryButtonProps {
    link:string
    children:React.ReactNode
}

const PrimaryButton: React.FunctionComponent<IPrimaryButtonProps> = (props) => {
    return <Link
        to={props.link}
        className="px-8 py-4 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200/50"
    >
        {props.children}
    </Link>;
};

export default PrimaryButton;
