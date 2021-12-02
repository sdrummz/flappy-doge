const dogeElem = document.querySelector('[data-doge]');
const DOGE_SPEED = 0.4;
const JUMP_DURATION = 140;
let timeSinceLastJump = Number.POSITIVE_INFINITY;

function setTop(top) {
  dogeElem.style.setProperty('--doge-top', top);
  document.removeEventListener('keydown', handleJump);
  document.addEventListener('keydown', handleJump);
}

function getTop() {
  return parseFloat(getComputedStyle(dogeElem).getPropertyValue('--doge-top'));
}

function updateDoge(delta) {
  if (timeSinceLastJump < JUMP_DURATION) {
    setTop(getTop() - DOGE_SPEED * delta);
  } else {
    setTop(getTop() + DOGE_SPEED * delta);
  }
  timeSinceLastJump += delta;
}

function setupDoge() {
  setTop(window.innerHeight / 2);
}

function handleJump(e) {
  if (e.code !== 'Space') return;
  timeSinceLastJump = 0;
}

function getDogeRect() {
  return dogeElem.getBoundingClientRect();
}

export { updateDoge, setupDoge, getDogeRect };
