import styles from "./styles.module.css";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate , useParams} from "react-router-dom";
import axios from "axios";
//import '~antd/dist/antd.css'; 
import {Alert} from "antd";

const Main = () => {

	const {firstName, lastName, userName, userType} = useParams();
	const [showAlert, setShowAlert] = useState(false);

	console.log(firstName);
	console.log(lastName);
	console.log(userName);

	const [data, setData] = useState({
        newPassword: "",
        confirmPassword: "",
	});

	const [user, setUser] = useState({
		firstName: firstName,
		lastName: lastName,
		email: userName,
		password: "",
		type: userType
	});	

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location= "/";
	};	

	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
        e.preventDefault();

		if(data.newPassword != data.confirmPassword){
			setShowAlert(true);
		}else{
			user.password = data.confirmPassword;
		}

        try {
			const url = "http://3.19.53.25:8080/api/users";
			const { data: res } = await axios.post(url, user);
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

	};


	return (
		<div className={styles.main_container}>
				<nav className={styles.navbar}>
					<h1>Passoword Reset Page</h1>        
					<button className={styles.black_btn_main} onClick={handleLogout}>
						Logout
					</button>
				</nav>		
				{showAlert && <Alert type='error' message='Error!' description='Password should match!'/>}

			<div className={styles.signup_form_container}>
				<div className={styles.create_container}>
					
                    <form className={styles.form_container} onSubmit={handleSubmit}>
						
                        <h1>Create New Password</h1>
						<div>
						<lable> New Password	:
						<input
							type="password"
							placeholder="New Password"
							name="newPassword"
							onChange={handleChange}
							value={data.newPassword}
							required
							className={styles.input}
						/>
						</lable>
						</div>

						<div>
						<lable>Confirm password		:
                        <input
							type="password"
							placeholder="Confirm Password"
							name="confirmPassword"
							onChange={handleChange}
							value={data.confirmPassword}
							required
							className={styles.input}
						/>
						</lable>
						</div>

						{error && <div className={styles.error_msg}>{error}</div>}
						
                        <button type="submit" className={styles.black_create_btn_main}>
							Create New Password
						</button>
					</form>

				</div>

			</div>
			
		</div>
	);
};

export default Main;

