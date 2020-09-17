const button = document.querySelector(".button")
console.log(button)
button.addEventListener("click", onClick)

function onClick() {
  // feature detect
  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          window.addEventListener("deviceorientation", (e) => {
            const el = document.querySelector(".element")
            el.style.transform =
              "rotateZ(" +
              (e.alpha - 180) +
              "deg) " +
              "rotateX(" +
              e.beta +
              "deg) " +
              "rotateY(" +
              -e.gamma +
              "deg)"
          })
        }
      })
      .catch(console.error)
  } else {
    // handle regular non iOS 13+ devices
    document.body.style.background = "red"
  }
}
