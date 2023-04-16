import './style.css'
import * as THREE from 'three'

console.log(THREE)

const scene = new THREE.Scene()

//Cube Group
const group = new THREE.Group()
group.position.set(0, 1, 0)
group.scale.set(1, 2, 1)
group.rotation.set(0, Math.PI, 0)
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000})
)

group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00})
)

cube2.position.set(-2, 0, 0)

group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff})
)

cube3.position.set(2, 0, 0)

group.add(cube3)

const axesHelper = new THREE.AxesHelper()

scene.add(axesHelper)

const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
scene.add(camera)
camera.position.set(0, 0, 3)

const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)

