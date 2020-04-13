"use strict";

import express from "express";

const router = express.Router();

router.get("/", (request, response) => {
	response.render("home",  {
		additionalStyles: ["biography", "about", "skills", "contact"],
		email: {
			name: "lucidsigma17",
			domain: "gmail"
		}
	});
});

router.get("/portfolio", (request, response) => {
	response.locals.title += " - Portfolio";

	response.render("portfolio", {
		additionalStyles: []
	});
});

router.get("/resume", (request, response) => {
	response.locals.title += " - R\u00E9sum\u00E9";

	response.render("resume", {
		additionalStyles: []
	});
});

export default router;