const birdElem = document.querySelector('[data-bird]');
const BIRD_SPEED = 0.5;
const JUMP_DURATION = 125;
let timeSinceLastJump = Number.POSITIVE_INFINITY;

function setTop(top) {
  birdElem.style.setProperty('--bird-top', top);
  document.removeEventListener('keydown', handleJump);
  document.addEventListener('keydown', handleJump);
}

function getTop() {
  return parseFloat(getComputedStyle(birdElem).getPropertyValue('--bird-top'));
}

function updateBird(delta) {
  if (timeSinceLastJump < JUMP_DURATION) {
    setTop(getTop() - BIRD_SPEED * delta);
  } else {
    setTop(getTop() + BIRD_SPEED * delta);
  }
  timeSinceLastJump += delta;
}

function setupBird() {
  setTop(window.innerHeight / 2);
}

function handleJump(e) {
  if (e.code !== 'Space') return;
  timeSinceLastJump = 0;
}

function getBirdRect() {
  return birdElem.getBoundingClientRect();
}

export { updateBird, setupBird, getBirdRect };
