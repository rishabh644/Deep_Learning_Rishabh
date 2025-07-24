import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles.css";

const registrationForm = () => {
	return (
		<div className="myloginform">
			<div className="myform">
				<form action="/register" method="post">
					<div>
						<div className="lbl">
							<label htmlFor="email">Email</label>
						</div>
						<div className="inpt">
							<input type="email" id="email" name="email" required />
						</div>
					</div>
					<div>
						<div className="lbl">
							<label htmlFor="password">Password</label>
						</div>
						<div className="inpt">
							<input type="password" id="password" name="password" required />
						</div>
					</div>

					<div className="submit">
						<input type="submit" value="Signup" id="submit" />
					</div>
				</form>
			</div>
		</div>
	);
};

export default registrationForm;
