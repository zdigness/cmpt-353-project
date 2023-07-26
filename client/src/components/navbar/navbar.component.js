import React , { Component } from 'react';
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './navbarElements'

export default class Navbar extends Component{
    render() {
        return (
            <>
                <Nav>
                    <Bars />
                    <NavMenu>
                        <NavLink to='/register-staff'>Register Staff</NavLink>
                        <NavLink to='/update-staff'>Update Staff</NavLink>
                        <NavLink to='/delete-staff'>Delete Staff</NavLink>
                        <NavLink to='/register-customer'>Register Customer</NavLink>
                        <NavLink to='/update-customer'>Update Customer</NavLink>
                        <NavLink to='/retrieve-customer'>Retrieve Customer</NavLink>
                        <NavLink to='/delete-customer'>Delete Customer</NavLink>
                        <NavLink to='/create-report'>Create Report</NavLink>
                        <NavLink to='/all-customer'>All Customers</NavLink>
                    </NavMenu>
                    <NavBtn>
                        <NavBtnLink to='/login'>Log In</NavBtnLink>
                    </NavBtn>
                </Nav>
            </>
        )
    }
}