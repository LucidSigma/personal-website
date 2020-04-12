const resizeCanvases = () => {
	$("#meshTerrain").outerHeight($("#biography").outerHeight());
	$("#polygons").outerHeight($("#skills").outerHeight());
};

$(window).on("load", resizeCanvases);
$(window).resize(resizeCanvases);