import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//Canvas
const canvas = document.querySelector(".webgl");

// Cursor
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)
})

const scene = new THREE.Scene();

//Cube Group
const group = new THREE.Group();
group.position.set(0, 0, 0);
group.scale.set(1, 1, 1);
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
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

window.addEventListener('resize', () => {
    //Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //Update Camera
    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()

    //Update Renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {

    const fullscreenElement = document.fullscreenElement || document.webkitFullScreenElement

    if (!fullscreenElement) {
        if(canvas.requestFullscreen){
            canvas.requestFullscreen()
        } else if (canvas.webkitRequestFullscreen){
            canvas.webkitRequestFullscreen()
        }
    } else {
        if(document.exitFullscreen){
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen){
            document.webkitExitFullscreen()
        }
    }
})

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)
scene.add(camera);
camera.position.set(0, 0, 3);
camera.lookAt(group.position);

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//Animations
const tick = () => {
  controls.update()

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
