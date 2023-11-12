import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startButton = document.querySelector('[data-start]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      alert('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function showSuccessMessage() {
  alert('Countdown completed!');
}

function updateTimer(endTime) {
  const currentDate = new Date();
  const timeDifference = endTime - currentDate;

  if (timeDifference <= 0) {
    clearInterval(timerInterval);
    showSuccessMessage();
    startButton.disabled = true;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

let timerInterval;

startButton.addEventListener('click', () => {
  const selectedDate = flatpickr("#datetime-picker").selectedDates[0];

  if (selectedDate) {
    const currentTime = new Date().getTime();

    if (selectedDate.getTime() > currentTime) {
      const endTime = selectedDate.getTime();
      timerInterval = setInterval(() => updateTimer(endTime), 1000);
    } else {
      alert('Please choose a date in the future');
    }
  }
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
