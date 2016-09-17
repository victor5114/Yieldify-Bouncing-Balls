export function getHeight() {
  return window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
}

export function getWidth() {
  return window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
}

export function isMobile() {
  return !(typeof window === 'object' && !window.isMobile);
}
