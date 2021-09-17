import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link, useHistory } from "react-router-dom";

export const Special = () => {
	const { store, actions } = useContext(Context);
	let history = useHistory();
	const [data, setData] = useState(null);

	const showMessage = async () => {
		// retrieve token form localStorage
		const token = localStorage.getItem("jwt-token");
		const resp = await fetch(`https://3001-fuchsia-kangaroo-uedhf8cu.ws-eu16.gitpod.io/api/protected`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			}
		});

		if (!resp.ok) {
			throw Error("There was a problem loading the information...");
		}
		const data = await resp.json();
		setData(data);
	};

	useEffect(() => {
		if (store.user_token === null) history.push("/login");
		else showMessage();
	}, []);

	return (
		<div className="container">
			<div className="row">
				<div className="col">
					<h1>Hello Rigo!</h1>

					<div className="alert alert-dark text-center">{data ? data.email : "loading..."}</div>
				</div>
			</div>
		</div>
	);
};
