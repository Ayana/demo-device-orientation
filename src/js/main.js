const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
)
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)

const element = document.querySelector(".element")
element.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)
cube.position.z = -5
cube.rotation.x = 10
cube.rotation.y = 5
renderer.render(scene, camera)

// const animate = function () {
//   cube.rotation.x += 0.01
//   renderer.render(scene, camera)
//   requestAnimationFrame(animate)
// }
// animate()


element.addEventListener("click", onClick)

function onClick() {
  // feature detect
  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          window.addEventListener("deviceorientation", (e) => {
            const animate = function () {
              cube.rotation.x += e.beta
              renderer.render(scene, camera)
              requestAnimationFrame(animate)
            }
            animate()
            
            // element.style.transform =
            //   "rotateZ(" + (e.alpha - 180) + "deg) " + 
            //   "rotateX(" + e.beta + "deg) " +
            //   "rotateY(" + -e.gamma + "deg)"
          })
        }
      })
      .catch(console.error)
  } else {
    // handle regular non iOS 13+ devices
    document.body.style.background = "red"
  }
}
