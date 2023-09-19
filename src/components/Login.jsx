import React, { useContext, useState } from 'react';
import './css/Login.css';
import './css/LoginResponsive.css';
import { LoginContext } from '../App';
import userService from "../services/userServices"
import { useNavigate,Link } from 'react-router-dom';


const Login = () => {

	const navigate = useNavigate();
	const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
	const [loggerData, setLoggerData] = useState({ email: "", password: "" })
	function handleSubmit(e) {
		try {
			e.preventDefault();
			userService.handleLogin(loggerData)
				.then(res => {
					console.log(res);
					if (res.status === 200) {
						setIsLoggedIn(prev => ({ ...prev, status: true, username: res?.data?.username, email:res.data?.email }));
						navigate('/home');
					}
				}).catch(() => {
					setIsLoggedIn(prev => ({ ...prev, status: false, username: "", email:"" }));
				})
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<section className="login-form-wrapper">
			<div className="center-wrapper">
				<div className="form-container">
					<h2>Log in</h2>
					<h4>Need a Mailchimp account?<Link to="/register">Create an account</Link></h4>
					<form onSubmit={handleSubmit} >
						<div> <label htmlFor="username">Username or Email</label>
							<input onChange={(e)=>{setLoggerData(prev => ({...prev, email:e.target.value}))}} value={loggerData?.email} type="text" name="username" /></div>
						<div> <label htmlFor="password">Password</label>
							<input onChange={(e)=>{setLoggerData(prev => ({...prev, password:e.target.value}))}} value={loggerData?.password} type="password" name="password" />
							<span id="wrongPassword"></span>{ /*if password not matched */}</div>

						<div className="custom-checkbox">
							<input type="checkbox" name="login" id="keepLogin" />
							<label htmlFor="keepLogin">Keep me logged in</label>
						</div>
						<div className="common-button"><input type="submit" value="Log in" /></div>
						<div className="reset-password-container">
							<a href="#">Forgot username?</a>
							<a href="#">Forgot password</a>
							<a href="#">Can't log in?</a>
						</div>
					</form>
				</div>
			</div>
		</section>
	)
}

export default Login