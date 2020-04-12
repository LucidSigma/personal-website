"use strict";

import express from "express";

const router = express.Router();

router.get("/", (request, response) => {
	response.render("home",  {
		additionalStyles: ["biography", "about", "skills", "contact"],
		email: "lucidsigma17@gmail.com"
	});
});

router.get("/portfolio", (request, response) => {
	response.locals.title += " - Portfolio";

	response.render("portfolio");
});

router.get("/resume", (request, response) => {
	response.locals.title += " - Resume";

	response.render("resume");
});

export default router;