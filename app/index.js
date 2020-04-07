"use strict";

// REQUIRED MODULES
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

// CONTROLLERS


// APP CONFIGURATION
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../public/views/"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public/")));

// MIDDLEWARE
app.use((request, response, next) => {
	response.locals.title = "Matt Schafer";

	next();
});

// CONTROLLER CONFIGURATION


// SERVER CONFIGURATION
const DEFAULT_PORT = 3000;

app.listen(process.env.PORT || DEFAULT_PORT, process.env.IP, () => {
	console.log(`Server listening on port ${process.env.PORT || DEFAULT_PORT}.`);
});