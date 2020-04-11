if (!Detector.webgl) {
	Detector.addGetWebGLMessage();
}

let camera = null;
let scene = null;

let terrain = {
	geometry: null,
	width: 8000,
	depth: 8000,
	height: 580,
	lod: 40,
	velocity: 1.5
};

let effects = {
	renderPass: null,
	copyPass: null,
	vignette: null,
	composer: null
};

const noise = {
	engine: new ImprovedNoise(),
	scale: 10,
	seed: Math.random() * 50
};

const rendererDiv = document.getElementById("meshTerrain");
const overRendererData = document.getElementById("biography");

let stepCount = 0;

initialise();
render();

function initialise() {
	camera = new THREE.PerspectiveCamera(60, overRendererData.offsetWidth / overRendererData.offsetHeight, 1, 10000);
	camera.position.z = 3000;

	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2(0x1D1140, 0.00045);

	let hemisphereLight = new THREE.HemisphereLight(0xF300FE, 0xB600A8, 0.5);
	hemisphereLight.position.y = 300;
	scene.add(hemisphereLight);

	const terrainMaterial = new THREE.MeshPhongMaterial({
		color: 0xFFFFFF,
		side: THREE.DoubleSide,
		blending: THREE.AdditiveBlending,
		wireframe: true
	});

	terrain.geometry = new THREE.PlaneGeometry(terrain.width, terrain.depth, terrain.lod, terrain.lod);
	
	let terrainMesh = new THREE.Mesh(terrain.geometry, terrainMaterial);
	terrainMesh.position.y = 50;
	terrainMesh.position.z = 50;
	terrainMesh.rotation.x = Math.PI / 1.5;

	let terrainGroup = new THREE.Object3D();
	terrainGroup.add(terrainMesh);
	scene.add(terrainGroup);

	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setSize(overRendererData.offsetWidth, overRendererData.offsetHeight);
	renderer.setClearColor(0x252560);

	rendererDiv.appendChild(renderer.domElement);

	effects.renderPass = new THREE.RenderPass(scene, camera);
	effects.vignette = new THREE.ShaderPass(THREE.VignetteShader);
	effects.copyPass = new THREE.ShaderPass(THREE.CopyShader);
	effects.copyPass.renderToScreen = true;

	effects.composer = new THREE.EffectComposer(renderer);
	effects.composer.addPass(effects.renderPass);
	effects.composer.addPass(effects.vignette);
	effects.composer.addPass(effects.copyPass);

	effects.vignette.uniforms["offset"].value = 1.5;
	effects.vignette.uniforms["darkness"].value = 1.25;
	
	updateWaveEffect();

	window.addEventListener("resize", onWindowResize, false);
}

function updateWaveEffect() {
	++stepCount;

	for (let i = 0; i <= terrain.lod; ++i) {
		for (let j = 0; j <= terrain.lod; ++j) {
			const position = i + (stepCount * terrain.velocity / terrain.depth * terrain.lod);
			
			terrain.geometry.vertices[i * (terrain.lod + 1) + j].z = noise.engine.noise(position / terrain.lod * noise.scale, j / terrain.lod * noise.scale, noise.seed) * terrain.height;
		}
	}

	terrain.geometry.verticesNeedUpdate = true;
}

function render() {
	requestAnimationFrame(render);
	
	updateWaveEffect();
	effects.composer.render(0.5);
}

function onWindowResize() {
	camera.aspect = overRendererData.offsetWidth / overRendererData.offsetHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(overRendererData.offsetWidth, overRendererData.offsetHeight);
	effects.composer.setSize(overRendererData.offsetWidth, overRendererData.offsetHeight);
}