import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GoogleAuth from "./Login_form/google_authenticator.jsx";
import EmailPasswordForm from "./Login_form/emailpassword.jsx";
import RegistrationForm from "./Registration_Form/registrationform.jsx";
import Dashboard from "./Dashboard/dashboard.jsx";
const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/home" element={<EmailPasswordForm />} />
				<Route path="/google-authenticator" element={<GoogleAuth />} />
				<Route path="/registration" element={<RegistrationForm />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</Router>
	);
};

export default App;
