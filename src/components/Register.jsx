import React, { useState } from 'react';

import userService from "../services/userServices"
import { useNavigate, Link } from 'react-router-dom';

function Register() {
	const navigate = useNavigate();
	const [registerData, setRegisterData] = useState({ email: "", username: "", password: "" })

	const handleUserRegister = async () => {
		try {
			console.log('Calling Register Backend', registerData)
			const res = await userService.handleRegister(registerData);
			console.log(res);
			if(res.status === 200){
				navigate('/');
			} else {
				
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			console.log(e)
			handleUserRegister();
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<section className="form-wrapper">
			<div className="center-wrapper">
				<div className="form-container">
					<h2>Sign up for Mailchimp</h2>
					<h4>Create a free account?<a href="#">log in</a></h4>
					<form onSubmit={handleSubmit}>
						<div> <label htmlFor="username">Business email</label>
							<input  onChange={(e)=>{setRegisterData(prev => ({...prev, email:e.target.value}))}} value={registerData?.email}  type="text" name="email" /></div>
						<div> <label htmlFor="password">Username</label>
							<input onChange={(e)=>{setRegisterData(prev => ({...prev, username:e.target.value}))}} value={registerData?.username} type="text" name="text" /></div>
						<div> <label htmlFor="password">Password</label>
							<input onChange={(e)=>{setRegisterData(prev => ({...prev, password:e.target.value}))}} value={registerData?.password} type="password" name="password" /></div>
						<div className="custom-checkbox">
							<input type="checkbox" name="login" id="emailNotification" />
							<label htmlFor="emailNotification"> I don't want to receive emails about Mailchimp and related Intuit product and feature updates, marketing best practices, and promotions from Mailchimp. </label>
						</div>
						<div>
							<p>By creating an account, you agree to our <a href="#"> Terms</a> and have read and acknowledge the <a href="#"> Global Privacy Statement.</a></p>
						</div>
						<div className="common-button"><input type="submit" value="Sign up" /></div>
					</form>
				</div>
			</div>
		</section>

	)
};
export default Register;