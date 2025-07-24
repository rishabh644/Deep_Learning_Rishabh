const path = require("path");

module.exports = {
	entry: "./index.js", // Your main React app entry point
	output: {
		filename: "bundle.js", // Name of the bundled output file
		path: path.join(__dirname, "/dist"), // Output directory for the bundled file
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/, // Rule for handling JavaScript and JSX files
				exclude: /node_modules/, // Exclude node_modules directory
				use: {
					loader: "babel-loader", // Use Babel loader for transpiling
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"], // Babel presets for modern JS and React
					},
				},
			},
			{
				test: /\.css$/, // New rule for CSS files
				use: ["style-loader", "css-loader"],
			},
		],
	},
};
