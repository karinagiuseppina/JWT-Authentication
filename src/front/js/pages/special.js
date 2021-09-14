import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

    const getMyTasks = async () => {
        // retrieve token form localStorage
        const token = localStorage.getItem('jwt-token');
        const resp = await fetch(`https://3001-aquamarine-toad-pzc1dric.ws-eu16.gitpod.io/api/protected`, {
           method: 'GET',
           headers: { 
             "Content-Type": "application/json",
             'Authorization': 'Bearer '+token
            } 
        });

        if(!resp.ok) {
            throw Error("There was a problem in the login request");
        }
        const data = await resp.json();
        console.log("This is the data you requested", data);
        return data
    
    }



	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!</h1>
			
				<button className="btn btn-light" onClick={getMyTasks}>
					get Message
				</button>
		</div>
	);
};
