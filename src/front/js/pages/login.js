import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { useHistory } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	let history = useHistory();

	const login = async () => {
		const resp = await fetch(`https://3001-fuchsia-kangaroo-uedhf8cu.ws-eu16.gitpod.io/api/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: email, password: password })
		});

		if (!resp.ok) throw Error("There was a problem in the login request");

		const data = await resp.json();
		// save your token in the localStorage
		//also you should set your user into the store using the setStore function
		localStorage.setItem("jwt-token", data.token);
		actions.setUser_token(data.token);
		history.push("/private");
	};

	return (
		<div className="container">
			<h1>Log in</h1>
			<div className="row">
				<div className="col">
					<div className="form-group">
						<label htmlFor="InputEmail">Email address</label>
						<input
							type="email"
							className="form-control"
							id="InputEmail"
							aria-describedby="emailHelp"
							placeholder="Enter email"
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="InputPassword">Password</label>
						<input
							type="password"
							className="form-control"
							id="InputPassword"
							placeholder="Enter Password"
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<button type="submit" className="btn btn-primary" onClick={login}>
						login
					</button>
				</div>
			</div>
		</div>
	);
};
