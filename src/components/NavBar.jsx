import React from "react";
import { Navbar } from "react-bootstrap";
import { Outlet } from 'react-router-dom';

export default function NavBarComponent() {
    return (
        <>
            <Navbar className="navBg" expand="lg" variant="dark">
                <Navbar.Brand href="/">PyLearn</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            </Navbar>
            <section>
                <Outlet />
            </section>
        </>
    );
};