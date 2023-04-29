import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager();

// loadingManager.onStart = () => {
//   console.log('started')
// }
// loadingManager.onLoad = () => {
//   console.log('loaded')
// }
// loadingManager.onProgress = () => {
//   console.log('progress')
// }
// loadingManager.onError = () => {
//   console.log('error')
// }

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load("./textures/minecraft.png");
const alphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const heightTexture = textureLoader.load('./textures/door/height.jpg')
const normalTexture = textureLoader.load('./textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('./textures/door/roughness.jpg')

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

// colorTexture.rotation = Math.PI * 0.25
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

//Canvas
const canvas = document.querySelector(".webgl");

const scene = new THREE.Scene();

//Cube Group
const group = new THREE.Group();
group.position.set(0, 0, 0);
group.scale.set(1, 1, 1);
scene.add(group);

const parameters = {
  color: 0xff0000,
  spin: () => {
    gsap.to(group.rotation, { duration: 1, y: group.rotation.y + 10 });
  },
};

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ map: colorTexture })
);

group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);

cube2.position.set(-2, 0, 0);

group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);

cube3.position.set(2, 0, 0);

group.add(cube3);

// Axes helper
// const axesHelper = new THREE.AxesHelper();

// scene.add(axesHelper);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  //Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //Update Camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  //Update Renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullScreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
scene.add(camera);
camera.position.set(0, 0, 3);

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Debug
 */

const gui = new GUI();

gui.add(group.position, "y", -3, 3, 0.01).name("elevation");
gui.add(group, "visible");
gui.add(cube1.material, "wireframe").name("middle cube wireframe");
gui.add(cube2.material, "wireframe").name("left cube wireframe");
gui.add(cube3.material, "wireframe").name("right cube wireframe");
gui.addColor(parameters, "color").onChange(() => {
  cube1.material.color.set(parameters.color);
});
gui.addColor(cube2.material, "color");
gui.add(parameters, "spin");

//Animations
const tick = () => {
  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
