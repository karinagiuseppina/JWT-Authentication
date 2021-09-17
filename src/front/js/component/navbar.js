import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [isLogged, setIsLogged] = useState(false);
	let history = useHistory();

	const handleLogout = () => {
		localStorage.setItem("jwt-token", null);
		actions.setUser_token(null);
		history.push("/");
		setIsLogged(false);
	};
	useEffect(() => {
		if (store.user_token === null) setIsLogged(false);
		else setIsLogged(true);
	}, []);

	const logIn = (
		<div className="ml-auto">
			<Link className="btn btn-primary m-1" to="/login">
				Login
			</Link>
			<Link className="btn btn-primary m-1" to="/signup">
				Sign Up
			</Link>
		</div>
	);

	const logOut = (
		<div className="ml-auto">
			<button className="btn btn-primary" onClick={handleLogout}>
				logout
			</button>
		</div>
	);

	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">React Boilerplate</span>
			</Link>
			{logIn}
			{logOut}
		</nav>
	);
};
