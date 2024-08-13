import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

const createMessage = (delay, radioBtn) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioBtn === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

const onCreateBtn = event => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const radioBtn = form.elements.state.value;

  createMessage(delay, radioBtn)
    .then(() => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'bottomCenter',
      });
    })
    .catch(() => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'bottomCenter',
      });
    });

  form.reset();
};

form.addEventListener('submit', onCreateBtn);
