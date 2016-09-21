/* eslint no-param-reassign: "off" */
export default function (global) {
  global.isMobile = global.navigator
    ? global.navigator.userAgent.match(/Android|webOS|iPhone|iPod|iPad/i)
    : false;

  global.document.body.className = global.isMobile ? 'mobile' : 'desktop';

  // requestAnim shim layer by Paul Irish
  global.requestAnimFrame = (function wrap() {
    return global.requestAnimationFrame ||
            global.webkitRequestAnimationFrame ||
            global.mozRequestAnimationFrame ||
            global.oRequestAnimationFrame ||
            global.msRequestAnimationFrame ||
            function rollbackFn(callback) {
              global.setTimeout(callback, 1000 / 60);
            };
  }());
}
