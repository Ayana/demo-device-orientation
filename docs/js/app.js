"use strict";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
var element = document.querySelector(".element");
element.appendChild(renderer.domElement);
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({
  color: 0xff0000
});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
cube.position.z = -5;
cube.rotation.x = 10;
cube.rotation.y = 5;
renderer.render(scene, camera);

var animate = function animate() {
  cube.rotation.x += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate();
element.addEventListener("click", onClick);

function onClick() {
  // feature detect
  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission().then(function (permissionState) {
      if (permissionState === "granted") {
        window.addEventListener("deviceorientation", function (e) {
          // const animate = function () {
          //   cube.rotation.x += e.beta
          //   renderer.render(scene, camera)
          //   requestAnimationFrame(animate)
          // }
          // animate()
          element.style.transform = "rotateZ(" + (e.alpha - 180) + "deg) " + "rotateX(" + e.beta + "deg) " + "rotateY(" + -e.gamma + "deg)";
        });
      }
    })["catch"](console.error);
  } else {
    // handle regular non iOS 13+ devices
    document.body.style.background = "red";
  }
}