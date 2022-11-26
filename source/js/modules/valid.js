export function initForms() {
  const forms = document.querySelectorAll('form');

  forms.forEach(initForm);
}

function initForm(form) {
  const phoneInput = form.querySelector('.phone-us');

  form.addEventListener('submit', (event) => {
    event.preventDefault();


    const phone = phoneInput.value;
    const isValid = checkPhone(phone);

    if (isValid) {
      alert('Форма отправлена');
      form.classList.remove('form__error');
      phoneInput.classList.remove('form__error');
    } else {
      alert('Заполните полностью форму!');
      phoneInput.classList.add('form__error');
    }
  });

  phoneInput.addEventListener('input', (event) => {
    phoneInput.classList.remove('form__error');
  });
}

function checkPhone(phone) {
  return /\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/.test(phone);
}
