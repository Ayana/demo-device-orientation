const element = document.querySelector(".element")

var width = window.innerWidth
var height = window.innerHeight

var renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(width, height)

var scene = new THREE.Scene()

var cubeGeometry = new THREE.CubeGeometry(100, 100, 100)
var cubeMaterial = new THREE.MeshLambertMaterial({
  color: 0xffffff,
})
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
cube.rotation.y = (Math.PI * 45) / 180
scene.add(cube)

var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000)
camera.position.y = 160
camera.position.z = 400
camera.lookAt(cube.position)

scene.add(camera)

var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000)
var skyboxMaterial = new THREE.MeshBasicMaterial({
  color: 0x000000,
  side: THREE.BackSide,
})
var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial)

scene.add(skybox)

var pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(0, 300, 200)

scene.add(pointLight)

// function render() {
//   requestAnimationFrame(render)

//   cube.rotation.y += 0.01

//   renderer.render(scene, camera)
// }

const button = document.querySelector(".button")
button.addEventListener("click", onClick)

function onClick() {
  // feature detect
  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          window.addEventListener("deviceorientation", (e) => {
            // document.body.style.background = "pink"
            button.style.display = "none"
            element.appendChild(renderer.domElement)

            function render() {
              requestAnimationFrame(render)

              cube.rotation.x = e.beta / 30
              cube.rotation.y = -e.gamma / 30
              // cube.rotation.z = -((e.alpha - 180) / 2)

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
    // document.body.style.background = "pink"
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
