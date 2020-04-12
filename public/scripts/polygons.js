requestAnimationFrame(update);

particlesJS("polygons", {
	"particles": {
		"number": {
			"value": 96,
			"density": {
				"enable": true,
				"value_area": 1000
			}
		},
		"color": {
			"value": "#400050"
		},
		"shape": {
			"type": "circle",
			"stroke": {
				"width": 0,
				"color": "#400050"
			},
			"polygon": {
				"nb_sides": 8
			}
		},
		"opacity": {
			"value": 0.75,
			"random": false,
			"anim": {
				"enable": false,
				"speed": 1,
				"opacity_min": 0.1,
				"sync": false
			}
		},
		"size": {
			"value": 4,
			"random": true,
			"anim": {
				"enable": false,
				"speed": 10,
				"size_min": 0.5,
				"sync": false
			}
		},
		"line_linked": {
			"enable": true,
			"distance": 150,
			"color": "#400050",
			"opacity": 0.75,
			"width": 1
		},
		"move": {
			"enable": true,
			"speed": 3,
			"direction": "none",
			"random": false,
			"straight": false,
			"out_mode": "out",
			"bounce": false,
			"attract": {
				"enable": false
			}
		}
	},
	"interactivity": {
		"detect_on": "canvas",
		"events": {
			"resize": true
		},
		"modes": {
			"grab": {
				"distance": 0
			},
			"push": {
				"particles_nb": 0
			}
		}
	},
	"retina_detect": true
});
		
function update() { 		
	requestAnimationFrame(update);
};