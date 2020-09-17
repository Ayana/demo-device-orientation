"use strict";

var button = document.querySelector(".button");
console.log(button);
button.addEventListener("click", onClick);

function onClick() {
  // feature detect
  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission().then(function (permissionState) {
      if (permissionState === "granted") {
        window.addEventListener("deviceorientation", function () {});
      }
    })["catch"](console.error);
  } else {
    // handle regular non iOS 13+ devices
    document.body.style.background = "red";
  }
}