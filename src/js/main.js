const element = document.querySelector(".element")

const width = window.innerWidth
const height = window.innerHeight

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(width, height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

const scene = new THREE.Scene()

const cubeGeometry = new THREE.CubeGeometry(100, 100, 100)
const cubeMaterial = new THREE.MeshLambertMaterial({
  color: 0xffffff,
})
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
cube.rotation.y = (Math.PI * 45) / 180
scene.add(cube)

const geometry = new THREE.PlaneGeometry(10000, 10000, 100, 100)
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  // side: THREE.DoubleSide,
})
const meshFloor = new THREE.Mesh(geometry, material)
meshFloor.rotation.x = (-90 * Math.PI) / 180
meshFloor.position.y = -100
meshFloor.receiveShadow = true
scene.add(meshFloor)

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
camera.position.y = 280
camera.position.z = 600
camera.lookAt(cube.position)

scene.add(camera)

// const skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000)
// const skyboxMaterial = new THREE.MeshBasicMaterial({
//   // color: 0x000000,
//   // side: THREE.BackSide,
// })
// const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial)

// scene.add(skybox)

// Add light
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(0, 300, 200)
pointLight.castShadow = true
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0x404040, 0.3)
scene.add(ambientLight)

const button = document.querySelector(".button")
button.addEventListener("click", onClick)

function onClick() {
  // feature detect
  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          window.addEventListener("deviceorientation", (e) => {
            document.body.style.background = "pink"
            button.style.display = "none"
            element.appendChild(renderer.domElement)

            function render() {
              requestAnimationFrame(render)

              cube.rotation.x = e.beta / 30
              cube.rotation.y = -e.gamma / 30
              cube.rotation.z = -((e.alpha - 180) / 30)

              renderer.render(scene, camera)
            }
            render()

            // element.style.transform =
            //   "rotateZ(" +
            //   (e.alpha - 180) +
            //   "deg) " +
            //   "rotateX(" +
            //   e.beta +
            //   "deg) " +
            //   "rotateY(" +
            //   -e.gamma +
            //   "deg)"
          })
        }
      })
      .catch(console.error)
  } else {
    // handle regular non iOS 13+ devices
    document.body.style.background = "pink"
    button.style.display = "none"
    element.appendChild(renderer.domElement)
    button.style.display = "none"

    function render() {
      requestAnimationFrame(render)

      cube.rotation.y += 0.01

      renderer.render(scene, camera)
    }
    render()
  }
}
