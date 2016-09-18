import styles from './index.scss';

export default function () {
  window.isMobile = navigator.userAgent.match(/Android|webOS|iPhone|iPod|iPad/i);
  document.body.className = window.isMobile ? styles.mobile : styles.desktop;

  // requestAnim shim layer by Paul Irish
  window.requestAnimFrame = (function wrap() {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function rollbackFn(callback) {
              window.setTimeout(callback, 1000 / 60);
            };
  }());
}
