import { type ReactNode } from 'react';


import { Navigate } from 'react-router-dom';
import { selectCurrentUser } from '../redux/features/auth/authSlice';

import { useSelector } from 'react-redux';

type TProtectedRoute = {
    children: ReactNode;
    role: string | undefined;
};

export const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
    const user = useSelector(selectCurrentUser);


    if (!user) {
        return <Navigate to="/login" replace={true} />;
    }
       
    // @ts-ignore
    if (role !== undefined && role !== user?.role) {
        return <Navigate to="/login" replace={true} />;
    }
    

    return children;
};
