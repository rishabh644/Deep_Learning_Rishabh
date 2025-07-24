import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Button, InputGroup, FormControl } from "react-bootstrap";

const Dashboard = () => {
	const [file, setFile] = useState(null);

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleButtonClick = () => {
		if (file) {
			const formData = new FormData();
			formData.append("pdfFile", file);

			fetch("/upload", {
				method: "POST",
				body: formData,
			})
				.then((response) => {
					console.log("Response from server", response);
				})
				.catch((error) => {
					console.error("Error", error);
				});
		} else {
			console.log("No file selected");
		}
	};

	return (
		<div className="dashboard">
			<InputGroup className="mb-3">
				<FormControl
					type="file"
					onChange={handleFileChange}
					aria-describedby="inputGroupFileAddon"
					aria-label="Upload"
				/>
				<Button onClick={handleButtonClick}>Upload</Button>
			</InputGroup>
		</div>
	);
};

export default Dashboard;
