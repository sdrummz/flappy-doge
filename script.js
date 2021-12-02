import { updateDoge, setupDoge, getDogeRect } from './doge.js';
import { updatePipes, setupPipes, getPassedPipeCount, getPipeRects } from './pipe.js';

document.addEventListener('keypress', handleStart, { once: true });
const title = document.querySelector('[data-title]');
const subtitle = document.querySelector('[data-subtitle]');

let lastTime;
function updateLoop(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(updateLoop);
    return;
  }
  const delta = time - lastTime;
  updateDoge(delta);
  updatePipes(delta);
  if (checkLose()) return handleLose();
  lastTime = time;
  window.requestAnimationFrame(updateLoop);
}

function checkLose() {
  const dogeRect = getDogeRect();
  const insidePipe = getPipeRects().some((rect) => isCollision(dogeRect, rect));
  const outsideWorld = dogeRect.top < 0 || dogeRect.bottom > window.innerHeight;
  return outsideWorld || insidePipe;
}

function isCollision(rect1, rect2) {
  return rect1.left < rect2.right && rect1.top < rect2.bottom && rect1.right > rect2.left && rect1.bottom > rect2.top;
}

function handleStart() {
  title.classList.add('hide');
  lastTime = null;
  setupDoge();
  setupPipes();
  window.requestAnimationFrame(updateLoop);
}

function handleLose() {
  setTimeout(() => {
    title.classList.remove('hide');
    subtitle.classList.remove('hide');
    subtitle.textContent = `${getPassedPipeCount()} Pipes`;
    document.addEventListener('keypress', handleStart, { once: true });
  }, 500);
}
