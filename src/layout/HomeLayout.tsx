import * as React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';



const HomeLayout: React.FunctionComponent = () => {
    return <>
        <Navbar />
        <main>
            <Outlet />
        </main>
        <Footer />
    </>;
};

export default HomeLayout;
