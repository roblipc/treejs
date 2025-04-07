import * as THREE from "https://cdn.skypack.dev/three@0.152.2";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.152.2/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "https://cdn.skypack.dev/three@0.152.2/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "https://cdn.skypack.dev/three@0.152.2/examples/jsm/geometries/TextGeometry.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const overlay = document.createElement("div");
overlay.style.position = "absolute";
overlay.style.top = "10px";
overlay.style.left = "10px";
overlay.style.padding = "5px 10px";
overlay.style.background = "rgba(0,0,0,0.6)";
overlay.style.color = "white";
overlay.style.fontFamily = "monospace";
overlay.innerText = "🧪 Scene initializing...";
document.body.appendChild(overlay);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(3, 3, 5);
camera.lookAt(0, 1, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.5, 16);
const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk.position.y = 0.75;
scene.add(trunk);

const leavesGeometry = new THREE.ConeGeometry(1, 2, 24);
const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
leaves.position.y = 2;
scene.add(leaves);

const groundGeo = new THREE.PlaneGeometry(20, 20);
const groundMat = new THREE.MeshStandardMaterial({ color: 0x228b22 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x404040, 1.2);
scene.add(ambientLight);

scene.add(new THREE.GridHelper(20, 20));
scene.add(new THREE.AxesHelper(5));

const loader = new FontLoader();
loader.load(
  "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
  (font) => {
    const geometry = new TextGeometry("🌳 Tree Top", {
      font: font,
      size: 0.3,
      height: 0.05,
    });
    const material = new THREE.MeshBasicMaterial({ color: 0xffdd00 });
    const text = new THREE.Mesh(geometry, material);
    text.position.set(-0.5, 3, 0);
    scene.add(text);
    overlay.innerText = "✅ Scene loaded.";
  }
);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

console.log("🧪 Scene initialized:", { scene, camera, trunk, leaves });
