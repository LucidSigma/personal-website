"use strict";

// REQUIRED MODULES
import bodyParser from "body-parser";
import express from "express";
import path from "path";

// CONTROLLERS
import mainController from "./controllers/mainController.js";

// APP CONFIGURATION
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "public", "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(path.resolve(), "public")));

// MIDDLEWARE
app.use((request, response, next) => {
	response.locals.title = "Matt Schafer";
	// REMEMBER TO UPDATE THE TITLE!

	next();
});

// CONTROLLER CONFIGURATION
app.use("/", mainController);

// SERVER CONFIGURATION
const DEFAULT_PORT = 3000;

app.listen(process.env.PORT || DEFAULT_PORT, process.env.IP, () => {
	console.log(`Server listening on port ${process.env.PORT || DEFAULT_PORT}.`);
});