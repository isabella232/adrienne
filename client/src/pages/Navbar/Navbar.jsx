import React from 'react';

import './Navbar.module.css';

// import avatarImg from '../../assets/avatar.svg';
import Logo from '../../assets/AdrienneLogo.png';

const Navbar = () => (
    <div className="Navbar">
        <div className="Navbar__Flex">
            <div className="Navbar__Logo">
                <img className="Navbar__Logo" src={Logo} alt="logo" />
            </div>
            <div>
                <p className="Navbar__Title inline">Hello Alberto</p>
                <p className="Navbar__Title inline">Balance : </p>
            </div>
        </div>
    </div>
);


export default Navbar;
