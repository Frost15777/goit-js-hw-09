const body = document.body;
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let intervalId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

function startColorSwitch() {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopColorSwitch() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(intervalId);
}

startBtn.addEventListener('click', startColorSwitch);
stopBtn.addEventListener('click', stopColorSwitch);