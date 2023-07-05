import './styles/style.css'
import './styles/style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5
scene.add(camera)

// Geometry
const geometry = new THREE.BoxGeometry(1, 1, 1)

// Define colors for each face of the cube
const cubeMaterials = [
  new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Red
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Green
  new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Blue
  new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Yellow
  new THREE.MeshBasicMaterial({ color: 0xff00ff }), // Magenta
  new THREE.MeshBasicMaterial({ color: 0x00ffff })  // Cyan
]

// Create a mesh using the geometry and materials
const cube = new THREE.Mesh(geometry, cubeMaterials)
scene.add(cube)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight)

// Mouse interaction variables
const mouse = new THREE.Vector2()
const raycaster = new THREE.Raycaster()
let isDragging = false
let previousMousePosition = {
  x: 0,
  y: 0
}

// Mouse events
canvas.addEventListener('mousedown', onMouseDown)
canvas.addEventListener('mouseup', onMouseUp)
canvas.addEventListener('mousemove', onMouseMove)

// Mouse down event handler
function onMouseDown(event) {
  event.preventDefault()
  isDragging = true
}

// Mouse up event handler
function onMouseUp(event) {
  event.preventDefault()
  isDragging = false
}

// Mouse move event handler
function onMouseMove(event) {
  event.preventDefault()

  // Calculate normalized device coordinates (-1 to +1) for mouse position
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  // Calculate the difference between the current and previous mouse position
  const deltaX = event.clientX - previousMousePosition.x
  const deltaY = event.clientY - previousMousePosition.y

  // Rotate the cube if dragging
  if (isDragging) {
    cube.rotation.y += deltaX * 0.01
    cube.rotation.x += deltaY * 0.01
  }

  // Update the previous mouse position
  previousMousePosition = {
    x: event.clientX,
    y: event.clientY
  }
}

// Animate
function animate() {
  requestAnimationFrame(animate)

  // Render the scene with the updated camera
  renderer.render(scene, camera)
}

animate()