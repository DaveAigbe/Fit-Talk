import React, {FunctionComponent, ReactNode} from 'react';
import NavBar from "./NavBar";
import Footer from "./Footer";

interface Props {
    children: ReactNode
}

const Layout: FunctionComponent<Props> = ({children}) => {

    return (
        <div>
            <NavBar/>
            {children}
            <Footer/>
        </div>
    );
};

export default Layout;
