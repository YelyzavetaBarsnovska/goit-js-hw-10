document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form);
    const delay = parseInt(formData.get('delay'));
    const state = formData.get('state');

    createPromise(delay, state)
      .then(delay => {
        iziToast.success({
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: 'topLeft',
          timeout: 5000,
        });
      })
      .catch(delay => {
        iziToast.error({
          message: `❌ Rejected promise in ${delay}ms`,
          position: 'topLeft',
          timeout: 5000,
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
});
