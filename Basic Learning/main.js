import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as lil from 'lil-gui';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);




// Bright directional light
const brightDirectionalLight = new THREE.DirectionalLight(0xffffff, 3);
brightDirectionalLight.position.set(10, 10, 10);
scene.add(brightDirectionalLight);
 

// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Point light
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(-5, -5, -5);
scene.add(pointLight);

// Light helpers
const brightDirectionalLightHelper = new THREE.DirectionalLightHelper(brightDirectionalLight, 1);
scene.add(brightDirectionalLightHelper);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
scene.add(directionalLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
scene.add(pointLightHelper);

let loader = new THREE.TextureLoader();
let color = loader.load("./text/color.jpg");
let roughness = loader.load("./text/roughness.jpg");
let normal = loader.load("./text/normal.jpg");

const geometry = new THREE.BoxGeometry(3, 1.8, 2);
const material = new THREE.MeshStandardMaterial({ map: color, roughnessMap: roughness, normalMap: normal });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);



window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Add GUI controls
const gui = new lil.GUI();

// Material folder
const materialFolder = gui.addFolder('Material');
materialFolder.add(material, 'roughness', 0, 1, 0.01);
materialFolder.add(material, 'metalness', 0, 1, 0.01);
materialFolder.add(material, 'wireframe');
materialFolder.add(material, 'transparent');
materialFolder.add(material, 'opacity', 0, 1, 0.01);
materialFolder.add(material, 'normalScale', 0, 2, 0.01);

// Mesh folder
const meshFolder = gui.addFolder('Mesh');
meshFolder.add(cube.position, 'x', -10, 10, 0.1);
meshFolder.add(cube.position, 'y', -10, 10, 0.1);
meshFolder.add(cube.position, 'z', -10, 10, 0.1);
meshFolder.add(cube.rotation, 'x', 0, Math.PI * 2, 0.01);
meshFolder.add(cube.rotation, 'y', 0, Math.PI * 2, 0.01);
meshFolder.add(cube.rotation, 'z', 0, Math.PI * 2, 0.01);
meshFolder.add(cube.scale, 'x', 0.1, 5, 0.1);
meshFolder.add(cube.scale, 'y', 0.1, 5, 0.1);
meshFolder.add(cube.scale, 'z', 0.1, 5, 0.1);

// Open folders by default
materialFolder.open();
meshFolder.open();



const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = false;
controls.dampingFactor = 0.01;


function animate() {
  window.requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
