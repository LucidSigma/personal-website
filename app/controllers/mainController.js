"use strict";

import express from "express";
import jsonFile from "jsonfile";
import path from "path";

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

router.get("/portfolio", async (request, response) => {
	response.locals.title += " - Portfolio";
	const json = await jsonFile.readFile(path.join(path.resolve(), "app", "data", "projects.json"));

	response.render("portfolio", {
		additionalStyles: ["portfolio"],
		projects: json["projects"]
	});
});

router.get("/resume", (request, response) => {
	response.locals.title += " - R\u00E9sum\u00E9";

	response.render("resume", {
		additionalStyles: []
	});
});

export default router;