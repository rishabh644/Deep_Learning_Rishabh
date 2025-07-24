import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import Context from "./components/ContextProvider/Context";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<Context>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Context>
);
