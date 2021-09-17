import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { useHistory } from "react-router-dom";

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	let history = useHistory();

	const signup = async () => {
		const resp = await fetch(`https://3001-fuchsia-kangaroo-uedhf8cu.ws-eu16.gitpod.io/api/signup`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: email, password: password, is_active: true })
		});

		if (!resp.ok) throw Error("There was a problem in the signup request");

		const data = await resp.json();
		history.push("/login");
	};

	return (
		<div className="container">
			<h1>Time to Register!</h1>
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
					<button type="submit" className="btn btn-primary" onClick={signup}>
						SignUp
					</button>
				</div>
			</div>
		</div>
	);
};
