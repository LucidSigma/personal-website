"use strict";

import express from "express";
import jsonFile from "jsonfile";
import path from "path";

const router = express.Router();

router.get("/", async (request, response) => {
	const json = await jsonFile.readFile(path.join(path.resolve(), "app", "data", "skills.json"));

	response.render("home",  {
		additionalStyles: ["biography", "about", "skills", "contact"],
		favouriteLanguages: json["favourites"]["languages"],
		favouriteTechnologies: json["favourites"]["technologies"],
		skills: json["skills"],
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

router.get("/resume", async (request, response) => {
	response.locals.title += " - R\u00E9sum\u00E9";
	const resumeJSON = await jsonFile.readFile(path.join(path.resolve(), "app", "data", "resume.json"));
	const skillsJSON = await jsonFile.readFile(path.join(path.resolve(), "app", "data", "skills.json"));

	response.render("resume", {
		additionalStyles: ["resume", "portfolio"],
		resume: resumeJSON["resume"],
		skills: skillsJSON["skills"]
	});
});

export default router;