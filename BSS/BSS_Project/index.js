import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
// import User from "./userModel.js";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

import multer from "multer";
import fs from "fs";
import storage from "./pdfStorage.js";
import bodyParser from "body-parser";

import userdb from "./models/userSchema.js";
import authenticate from "./middleware/authenticate";

const DB = process.env.DATABASE;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3000;

mongoose
	.connect(DB, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => console.log("DataBase Connected"))
	.catch((err) => {
		console.log(err);
	});

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

console.log(__dirname);

console.log(storage);

const upload = multer({ storage });

const pdfSchema = new mongoose.Schema({ title: String, path: String });

const PDF = mongoose.model("pdf", pdfSchema);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("/home", (req, res) => {
	res.sendFile(path.join(__dirname, "/frontend/index.html"));
});

app.post("/register", async (req, res) => {
	const { fname, email, password, cpassword } = req.body;

	if (!fname || !email || !password || !cpassword) {
		res.status(422).json({ error: "fill all the details" });
	}

	try {
		const preuser = await userdb.findOne({ email: email });

		if (preuser) {
			res.status(422).json({ error: "This Email is Already Exist" });
		} else if (password !== cpassword) {
			res
				.status(422)
				.json({ error: "Password and Confirm Password Not Match" });
		} else {
			const finalUser = new userdb({
				fname,
				email,
				password,
				cpassword,
			});

			// here password hasing

			const storeData = await finalUser.save();

			// console.log(storeData);
			res.status(201).json({ status: 201, storeData });
		}
	} catch (error) {
		res.status(422).json(error);
		console.log("catch block error");
	}
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(422).json({ error: "fill all the details" });
	}

	try {
		const userValid = await userdb.findOne({ email: email });

		if (userValid) {
			const isMatch = await bcrypt.compare(password, userValid.password);

			if (!isMatch) {
				res.status(422).json({ error: "invalid details" });
			} else {
				// token generate
				const token = await userValid.generateAuthtoken();
				//console.log(token);

				// cookiegenerate
				res.cookie("usercookie", token, {
					expires: new Date(Date.now() + 9000000),
					httpOnly: true,
				});

				const result = {
					userValid,
					token,
				};
				res.status(201).json({ status: 201, result });
			}
		}
	} catch (error) {
		res.status(401).json(error);
		console.log("catch block");
	}
});

app.get("/validuser", authenticate, async (req, res) => {
	try {
		const ValidUserOne = await userdb.findOne({ _id: req.userID });
		res.status(201).json({ status: 201, ValidUserOne });
	} catch (error) {
		res.status(401).json({ status: 401, error });
	}
});

app.get("/logout", authenticate, async (req, res) => {
	try {
		req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
			return curelem.token != req.token;
		});

		res.clearCookie("usercookie", { path: "/home" });

		req.rootUser.save();

		res.status(201).json({ status: 201 });
	} catch (error) {
		res.status(401).json({ status: 401, error });
	}
});

app.post("/upload", upload.single("pdfFile"), async (req, res) => {
	console.log(req.file);
	try {
		const { originalname, path: filePath } = req.file;

		const svdta = { title: originalname, path: filePath };

		const pdf = new PDF(svdta);

		pdf.save().then((doc) => res.status(201).send(doc));
	} catch (error) {
		res.status(500).send("Error uploading PDF");
	}
});

app.get("/pdfs", async (req, res) => {
	try {
		const pdfs = await PDF.find();
		res.json(pdfs);
	} catch (error) {
		res.status(500).send("Error fetching PDFs");
	}
});

app.delete("/pdfs/:id", async (req, res) => {
	try {
		const pdf = await PDF.findById(req.params.id);
		fs.unlinkSync(pdf.path);
		await pdf.remove();
		res.send("PDF deleted successfully!");
	} catch (error) {
		res.status(500).send("Error deleting PDF");
	}
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
