import React, { useState } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavbarToggler,
    Collapse,
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

    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    if (props.token === null) {
        links = (
            <Nav className='ms-auto mr-md-5' navbar>
                <NavItem>
                    <NavLink exact to='/login' className='NavLink'>
                        Login
                    </NavLink>
                </NavItem>
            </Nav>
        );
    } else {
        links = (
            <Nav className='ms-auto mr-md-5' navbar>
                <NavItem>
                    <NavLink exact to='/' className='NavLink'>
                        Burger Builder
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink exact to='/orders' className='NavLink'>
                        Orders
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink exact to='/logout' className='NavLink'>
                        Logout
                    </NavLink>
                </NavItem>
            </Nav>
        );
    }
    return (
        <div className='Navigation'>
            <Navbar
                dark
                expand='sm'
                style={{
                    backgroundColor: '#D70F64',
                    height: '70px'
                }}
            >
                <NavbarBrand href='/' className='mr-auto ml-md-5 Brand'>
                    <img src={Logo} alt='Logo' width='80px' />
                </NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className='mr-2' />
                <Collapse isOpen={!collapsed} navbar>
                    {links}
                </Collapse>
            </Navbar>
        </div>
    );
};
export default connect(mapStateToProps)(Header);