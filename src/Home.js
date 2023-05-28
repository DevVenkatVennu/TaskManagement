import React from "react";
import { Link} from 'react-router-dom'
import { Navbar, Nav} from 'react-bootstrap'

const HomeComponent = () => {
	return (
		<>
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="/">User Task Management</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link as={Link} to="/my-tasks">Tasks</Nav.Link>
					<Nav.Link as={Link} to="/profile">Profile</Nav.Link>
					<Nav.Link as={Link} to="/login">Logout</Nav.Link>
				</Nav>
			</Navbar>
		</>
	)
}

export default HomeComponent;