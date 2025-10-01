import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Перевіряємо чи ми на сторінці снекбара
if (document.querySelector('.form')) {
  const form = document.querySelector('.form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const delay = parseInt(formData.get('delay'));
    const state = formData.get('state');

    createPromise(delay, state)
      .then(delay => {
        console.log(`✅ Fulfilled promise in ${delay}ms`);
        iziToast.show({
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: 'topRight',
          timeout: 5000,
          backgroundColor: '#4CAF50',
          theme: 'dark',
          progressBar: false,
          close: false,
        });
      })
      .catch(delay => {
        console.log(`❌ Rejected promise in ${delay}ms`);
        iziToast.show({
          message: `❌ Rejected promise in ${delay}ms`,
          position: 'topRight',
          timeout: 5000,
          backgroundColor: '#F44336',
          theme: 'dark',
          progressBar: false,
          close: false,
        });
      });

    form.reset();
  });

  function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  }
}
