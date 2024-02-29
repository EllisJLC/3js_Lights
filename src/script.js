import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0)
scene.add(ambientLight)
const ambientLightFolder = gui.addFolder('Ambient Light')
ambientLightFolder.add(ambientLight, 'intensity').min(0).max(3).step(0.001)
ambientLightFolder.addColor(ambientLight, 'color')

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0)
directionalLight.position.set(1, 0.25, 0)
scene.add(directionalLight)
const directionalLightFolder = gui.addFolder('Directional Light')
directionalLightFolder.add(directionalLight, 'intensity').min(0).max(3).step(0.001)
directionalLightFolder.add(directionalLight.position, 'x').min(-2).max(2).step(0.01)
directionalLightFolder.add(directionalLight.position, 'y').min(-2).max(2).step(0.01)
directionalLightFolder.add(directionalLight.position, 'z').min(-2).max(2).step(0.01)
directionalLightFolder.addColor(directionalLight, 'color')

const hemisphereLight = new THREE.HemisphereLight(0xff000, 0x0000ff, 0)
scene.add(hemisphereLight)
const hemisphereLightFolder = gui.addFolder('Hemisphere Light')
hemisphereLightFolder.add(hemisphereLight, 'intensity').min(0).max(3).step(0.001)
hemisphereLightFolder.addColor(hemisphereLight, 'color')
hemisphereLightFolder.addColor(hemisphereLight, 'groundColor')

const pointLight = new THREE.PointLight(0xff9000, 0, 1)
pointLight.position.set(1, -0.5, 1)
scene.add(pointLight)
const pointLightFolder = gui.addFolder('Point Light')
pointLightFolder.add(pointLight, 'intensity').min(0).max(3).step(0.001)
pointLightFolder.add(pointLight.position, 'x').min(-2).max(2).step(0.01)
pointLightFolder.add(pointLight.position, 'y').min(-2).max(2).step(0.01)
pointLightFolder.add(pointLight.position, 'z').min(-2).max(2).step(0.01)
pointLightFolder.add(pointLight, 'distance').min(0).max(6).step(0.01)
pointLightFolder.add(pointLight, 'decay').min(0).max(3).step(0.01)
pointLightFolder.addColor(pointLight, 'color')

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 0, 1, 1)
rectAreaLight.position.set(-1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3())
scene.add(rectAreaLight)
const rectAreaLightFolder = gui.addFolder('Rect Area Light')
rectAreaLightFolder.add(rectAreaLight, 'intensity').min(0).max(6).step(0.001)
rectAreaLightFolder.add(rectAreaLight.position, 'x').min(-2).max(2).step(0.01).onChange( () => {
    rectAreaLight.lookAt(new THREE.Vector3())
})
rectAreaLightFolder.add(rectAreaLight.position, 'y').min(-2).max(2).step(0.01).onChange( () => {
    rectAreaLight.lookAt(new THREE.Vector3())
})
rectAreaLightFolder.add(rectAreaLight.position, 'z').min(-2).max(2).step(0.01).onChange( () => {
    rectAreaLight.lookAt(new THREE.Vector3())
})
rectAreaLightFolder.addColor(rectAreaLight, 'color')

const spotLight = new THREE.SpotLight(0x78ff00, 4.5, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(0, 2, 3)
scene.add(spotLight)
scene.add(spotLight.target)
const spotLightFolder = gui.addFolder("Spotlight")
spotLightFolder.add(spotLight, 'intensity').min(0).max(6).step(0.001)
spotLightFolder.add(spotLight.position, 'x').min(-2).max(2).step(0.01).name("Spotlight x")
spotLightFolder.add(spotLight.position, 'y').min(-2).max(2).step(0.01).name("Spotlight y")
spotLightFolder.add(spotLight.position, 'z').min(-2).max(2).step(0.01).name("Spotlight z")
spotLightFolder.add(spotLight.target.position, 'x').min(-2).max(2).step(0.01).name("Target x")
spotLightFolder.add(spotLight.target.position, 'y').min(-2).max(2).step(0.01).name("Target y")
spotLightFolder.add(spotLight.target.position, 'z').min(-2).max(2).step(0.01).name("Target z")
spotLightFolder.addColor(spotLight, 'color')


/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()