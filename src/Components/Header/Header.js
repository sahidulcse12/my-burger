import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap';
import Logo from '../../assets/logo.png';

import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        token: state.token,
    }
}

const Header = (props) => {
    let links = null;
    if (props.links === null) {
        links = (
            <Nav className="mr-md-5">
                <NavItem>
                    <NavLink to="/login" className="NavLink">Login</NavLink>
                </NavItem>
            </Nav>
        )
    } else {
        links = (
            <Nav className="mr-md-5">
                <NavItem>
                    <NavLink to="/" exact className="NavLink">Burger Builder</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/orders" className="NavLink">Orders</NavLink>
                </NavItem>
            </Nav>
        )
    }
    return (
        <div style={{ backgroundColor: "#D70F64" }}>
            <div className="Navigation container">
                <Navbar style={{
                    height: "70px"
                }}>
                    <NavbarBrand href="/" className="mr-auto ml-md-5 Brand">
                        <img src={Logo} alt="Logo" width="80px" />
                    </NavbarBrand>
                    {links}
                </Navbar>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(Header);