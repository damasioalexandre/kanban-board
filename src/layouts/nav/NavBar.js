import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Link, IndexLink} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';

class NavbarInstance extends Component {
    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <IndexLink to="/" activeClassName="active">React Kan Ban</IndexLink>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to="/board">
                            <NavItem eventKey={1}>Board</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/backlog">
                            <NavItem eventKey={2}>Backlog</NavItem>
                        </LinkContainer>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

class NavBar extends Component {
    render() {
        return (
            <NavbarInstance />
        );
    }
}

export default NavBar;