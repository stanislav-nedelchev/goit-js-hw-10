import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const inputDate = document.querySelector('#datetime-picker');

let intervalId = null;
let selectedDate = null;
let currentDate = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      iziToast.error({
        message: 'Будь-ласка, оберіть час у майбутньому',
        position: 'bottomCenter',
      });
    } else {
      selectedDate = selectedDates[0].getTime();
      startBtn.disabled = false;
      iziToast.success({
        message: 'Натисніть кнопку "Start"',
        position: 'bottomCenter',
      });
    }
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function stopTimer() {
  startBtn.disabled = true;
  inputDate.disabled = false;
  clearInterval(intervalId);
  return;
}

function startTimer() {
  intervalId = setInterval(() => {
    currentDate = Date.now();
    const deltaTime = selectedDate - currentDate;
    updateTimerface(convertMs(deltaTime));
    startBtn.disabled = true;
    inputDate.disabled = true;

    if (deltaTime <= 1000) {
      stopTimer();
      iziToast.success({
        message: 'Відлік завершено',
        position: 'bottomCenter',
      });
    }
  }, 1000);
}

function updateTimerface({ days, hours, minutes, seconds }) {
  dataDays.textContent = `${days}`;
  dataHours.textContent = `${hours}`;
  dataMinutes.textContent = `${minutes}`;
  dataSeconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

flatpickr(inputDate, options);

startBtn.addEventListener('click', startTimer);
