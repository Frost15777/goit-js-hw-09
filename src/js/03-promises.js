document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const firstDelay = parseInt(this.elements.delay.value, 10);
  const step = parseInt(this.elements.step.value, 10);
  const amount = parseInt(this.elements.amount.value, 10);

  if (isNaN(firstDelay) || isNaN(step) || isNaN(amount)) {
    alert('Please enter valid numbers for delay, step, and amount.');
    return;
  }

  for (let i = 1; i <= amount; i++) {
    createPromise(i, firstDelay + (i - 1) * step)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      setTimeout(() => {
        resolve({ position, delay });
      }, delay);
    } else {
      reject({ position, delay });
    }
  });
}
