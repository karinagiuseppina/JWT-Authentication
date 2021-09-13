import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export const Login = () => {
	const { store, actions } = useContext(Context);

	const handleLogin = () => {
		let email = document.getElementById("InputEmail").value;
		let password = document.getElementById("InputPassword").value;
		console.log(email, password);
		let data = login(email, password);
	};
	const login = async (email, password) => {
		const resp = await fetch(`https://3001-blush-snake-r5p4vzk4.ws-eu16.gitpod.io/api/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: email, password: password })
		});

		if (!resp.ok) throw Error("There was a problem in the login request");

		if (resp.status === 401) {
			throw "Invalid credentials";
		} else if (resp.status === 400) {
			throw "Invalid email or password format";
		}
		const data = await resp.json();
		// save your token in the localStorage
		//also you should set your user into the store using the setStore function
		localStorage.setItem("jwt-token", data.token);
		console.log(data);
		return data;
	};

	return (
		<div className="container">
			<form>
				<div className="form-group">
					<label htmlFor="InputEmail">Email address</label>
					<input
						type="email"
						className="form-control"
						id="InputEmail"
						aria-describedby="emailHelp"
						placeholder="Enter email"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="InputPassword">Password</label>
					<input type="password" className="form-control" id="InputPassword" placeholder="Password" />
				</div>
				<div className="form-check">
					<input type="checkbox" className="form-check-input" id="exampleCheck1" />
					<label className="form-check-label" htmlFor="exampleCheck1">
						Check me out
					</label>
				</div>
				<button type="submit" className="btn btn-primary" onClick={handleLogin}>
					login
				</button>
			</form>
		</div>
	);
};
