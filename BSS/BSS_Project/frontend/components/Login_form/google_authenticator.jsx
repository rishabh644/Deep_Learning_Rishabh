import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import React from "react";
import "./styles.css";

const clientId =
	"817241561935-2fi0dt4qo35gmrm93pcirvokedp1u2hs.apps.googleusercontent.com";
function GoogleAuth() {
	const responseMessage = (response) => {
		console.log(response);
	};

	const errorMessage = (error) => {
		console.log(error);
	};
	return (
		<div className="Gdiv">
			<GoogleOAuthProvider clientId={clientId}>
				<GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
			</GoogleOAuthProvider>
		</div>
	);
}

export default GoogleAuth;
