import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({ title: String, path: String });

const PDF = mongoose.model("pdf", pdfSchema);

export default PDF;
