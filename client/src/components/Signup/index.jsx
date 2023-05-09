import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

import GoogleLogin from "react-google-login";
import { gapi } from 'gapi-script'
import React from 'react';
import filename from "../Messenger/img/add.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../Messenger/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";


import './styles.css';

const Signup = () => {

	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		type: "Customer",
	});

	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(data);
		const displayName = data.firstName;
		const email = data.email;
		const password = data.password;
		const usertype = data.type;
		const file = new File([filename], 'add.png', { type: 'image/png' });
		
		try {
			//Create user
			const res = await createUserWithEmailAndPassword(auth, email, password);

			//Create a unique image name
			const date = new Date().getTime();
			const storageRef = ref(storage, `${data.displayName + date}`);
			await uploadBytesResumable(storageRef, file).then(() => {
			  getDownloadURL(storageRef).then(async (downloadURL) => {
				try {
				  //Update profile
				  await updateProfile(res.user, {
					displayName,
					photoURL: downloadURL,
				  });
				  //create user on firestore
				  console.log(displayName)
				  await setDoc(doc(db, "users", res.user.uid), {
					uid: res.user.uid,
					displayName,
					email,
					usertype:usertype,
					photoURL: downloadURL,
				  });
	  
				  //create empty user chats on firestore
				  await setDoc(doc(db, "userChats", res.user.uid), {});
				  
				  const url = "http://3.19.53.25:8080/api/users";
					const { data: response } = await axios.post(url, data);
					console.log(data);
					console.log(response.message);
				  navigate("/login");
				} catch (err) {
				  console.log(err);
				//   setError(err);
				}
			  });
			});
		  } catch (err) {
			console.log(err)
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
			// setError(err);
		  }
	};

	//for OAuth creating the user based on the gmail
	const handleOauth = async(e) => {
		console.log("handleOauth function called");
		try {
			const url = "http://3.19.53.25:8080/api/users";
			const { data: res } = await axios.post(url, data);
			console.log(data);
			console.log(res.message);
			navigate("/login");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}		
	}

	const onLoginSuccess = (response) => {
		data.firstName = response.profileObj.givenName;
		data.lastName  = response.profileObj.familyName;
		data.email     = response.profileObj.email;

		//window.location = `/resetPassword/${data.firstName}/${data.lastName}/${data.email}/${data.type}`;
		handleOauth(data);
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


	return (
		<div className={styles.signupcontainer}>
			<div className={styles.container}>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create an Account</h1>
						<label>
						Sign up as:
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
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
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
						<button type="submit" className={styles.white_btn}>
							Sign Up
						</button>
					</form>
					<GoogleLogin className={styles.google_button}
						clientId="169724478658-r3cqr42bt9geva4pfibqpvmurauc27mo.apps.googleusercontent.com"
						buttonText="Sign up with Google"
						onSuccess={onLoginSuccess}
						onFailure={onLoginFailure}
						cookiePolicy={'single_host_origin'}
					/>
				</div>
				<div className={styles.left}>
					<h1>Already have an account?</h1>
					<Link to="/login">
						<button type="button" className="button">
							Sign in
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Signup;