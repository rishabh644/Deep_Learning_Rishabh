import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	NavLink,
	useNavigate,
} from "react-router-dom";
import "./styles.css";
import { useState } from "react";

const EmailPasswordForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const history = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch("/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			console.log(response);
			if (response.ok) {
				const data = await response.json();

				if (data.success) {
					// window.location.href = "/dashboard";
					history("/dashboard");
				} else {
					setError(data.message);
				}
			} else {
				setError("An error occured. Please try again later.");
			}
		} catch (error) {
			console.error("Error during login:", error);
			setError("An unexpected error occured.");
		} finally {
			setEmail("");
			setPassword("");
		}
	};

	return (
		<div className="myloginform">
			<div className="myform">
				<form onSubmit={handleSubmit}>
					<div>
						<div className="lbl">
							<label htmlFor="email">Email</label>
						</div>
						<div className="inpt">
							<input
								type="email"
								id="email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
					</div>
					<div>
						<div className="lbl">
							<label htmlFor="password">Password</label>
						</div>
						<div className="inpt">
							<input
								type="password"
								id="password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
					</div>

					<div className="submit">
						<input type="submit" value="Login" id="submit" />
					</div>
				</form>
				<div className="mylbl">
					<Link to="/google-authenticator">Login with Google</Link>
				</div>
				<div className="mylbl">
					<Link to="/registration">Click here to Register</Link>
				</div>
			</div>
		</div>
	);
};

export default EmailPasswordForm;
