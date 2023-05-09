import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
//import './styles.css';
import GoogleLogin from "react-google-login";
import { gapi } from 'gapi-script'
import React from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Messenger/firebase";


const Login = () => {

	const [data, setData] = useState({ email: "", password: "" , type:"Customer"});
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	//for OAuth
	const onLoginSuccess = (response) => {
		console.log(response);
		const user_email      = response.profileObj.email;
		const url = `/customerdashboard/${user_email}`;
		window.location= url;
		console.log('Login successful!', response.profileObj.email);
	  };
	  
	const onLoginFailure = (response) => {
		console.log('Login failed!', response);
	  }; 

	useEffect(()=> {
		function start() {
			gapi.client.init({
				clientId: '169724478658-r3cqr42bt9geva4pfibqpvmurauc27mo.apps.googleusercontent.com',
				scope:""
			})
		};
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {



			const url = "http://3.19.53.25:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			
			console.log(data);

			await signInWithEmailAndPassword(auth, data.email , data.password );

			if(data.email==="dinesh@gmail.com" && data.password ==="Test@123"){
				const url = `/adminhomepage/${data.email}`;
				window.location= url;	
			}
			
			if (data.type === "Customer" && data.email != "dinesh@gmail.com" ) {
				const url = `/customerdashboard/${data.email}`;
				window.location= url;
			}
			
			if (data.type === "Staff" && data.email != "dinesh@gmail.com" ) {
				console.log("here");
				const url = `/staffhomepage/${data.email}`;
				window.location= url;				
			}
			
			// if (data.type === "Admin") {
			// 	const url = `/adminhomepage/${data.email}`;
			// 	window.location= url;					
			// }

		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
	<>
		<div className={styles.blackbox}>
		  <div className={styles.backgroundlayer}></div>
		  <img src={require('./images/icon.png')} className={styles.overlayimage} alt="Overlay" />
		</div>
		<div className={styles.container}>
		  	<form className={styles.form_container} onSubmit={handleSubmit} >
						<h1>Sign In</h1>
						<label className={styles.newlabel}>
						Login as:
						<select onChange={handleChange}
									value={data.type}
									placeholder="Login as"
									name="type"
									className={styles.dropdown}>
								<option value="Customer">Customer</option>
								<option value="Staff">Staff</option>
						</select><br></br>
						</label>                        
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.button} >
							Sign In
						</button>
						<GoogleLogin className={styles.google_button}
							clientId="169724478658-r3cqr42bt9geva4pfibqpvmurauc27mo.apps.googleusercontent.com"
							buttonText="Sign in with Google"
							onSuccess={onLoginSuccess}
							onFailure={onLoginFailure}
							cookiePolicy={'single_host_origin'}
						/>								
				</form>
				<div>
					<h3>Don't have an account?</h3>
					<div className={styles.signupbuttoncontainer}>
					<Link to="/signup">
						<button type="button" className={styles.button}>
							Sign Up
						</button>
					</Link>
					</div>			
				</div>
		</div>
	  </>
	);
};

export default Login;