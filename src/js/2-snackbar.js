import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

const createMessage = delay => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (form.elements.state.value === 'fulfilled') {
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

  createMessage(delay)
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

  form.elements.delay.value = '';
};

form.addEventListener('submit', onCreateBtn);
