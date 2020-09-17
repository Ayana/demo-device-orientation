/**
 *
 */
export default function() {
  if (navigator.userAgent.match(/Trident\/7\./)) {
    // if IE
    var mousewheelevent =
      'onwheel' in document
        ? 'wheel'
        : 'onmousewheel' in document
        ? 'mousewheel'
        : 'DOMMouseScroll';
    try {
      document.addEventListener(mousewheelevent, onWheel, false);
    } catch (e) {
      //for legacy IE
      document.attachEvent('onmousewheel', onWheel);
    }
    function onWheel(e) {
      if (!e) e = window.event; //for legacy IE
      e.preventDefault();
      var wheelDelta = e.wheelDelta;
      var currentScrollPosition = window.pageYOffset;
      window.scrollTo(0, currentScrollPosition - wheelDelta);
    }
  }
}
