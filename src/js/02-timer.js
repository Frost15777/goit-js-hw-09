import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startButton = document.querySelector('[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');
const dateTimePicker = document.getElementById('datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();
    if (selectedDate < now) {
      alert('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(dateTimePicker, options);

let countdownInterval;
let targetDate;

const updateTimer = () => {
  const currentDate = new Date();
  const remainingTime = targetDate - currentDate;

  if (remainingTime < 0) {
    clearInterval(countdownInterval);
    startButton.disabled = true;
    dateTimePicker.disabled = false;
    alert('Countdown completed!');
    return;
  }

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
  const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
  const minutes = Math.floor((remainingTime / 1000 / 60) % 60).toString().padStart(2, '0');
  const seconds = Math.floor((remainingTime / 1000) % 60).toString().padStart(2, '0');

  daysField.textContent = days;
  hoursField.textContent = hours;
  minutesField.textContent = minutes;
  secondsField.textContent = seconds;
};

const startCountdown = () => {
  targetDate = new Date(dateTimePicker.value);
  countdownInterval = setInterval(updateTimer, 1000);
  startButton.disabled = true;  
  dateTimePicker.disabled = true;
};

startButton.addEventListener('click', startCountdown);