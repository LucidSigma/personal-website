const resizeCanvases = () => {
	$("#meshTerrain").outerHeight($("#biography").outerHeight());
	$("#skills").outerHeight($("#skillsInfo").outerHeight());
};

$(document).ready(resizeCanvases);
$(window).resize(resizeCanvases);