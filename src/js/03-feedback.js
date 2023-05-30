import localstorageAPI from './localstorage.js';
const throttle = require('lodash.throttle');

const inputForm = document.querySelector('form');
inputForm.classList.add('js-form-input');
let userInfo = {};

const fillInputFromLocalStorage = () => {
  const userInfoFromLS = localstorageAPI.load('feedback-form-state');
  if (userInfoFromLS === undefined) {
    return;
  }

  for (let key in userInfoFromLS) {
    inputForm.elements[key].value = userInfoFromLS[key];
    if (userInfoFromLS[key] !== '') {
      userInfo[key] = userInfoFromLS[key];
    }
  }
};

fillInputFromLocalStorage();

const formOnChange = event => {
  const inputEmailEl = event.target;
  const inputEmailValue = inputEmailEl.value;
  const inputEmailName = inputEmailEl.name;
  userInfo[inputEmailName] = inputEmailValue;

  localstorageAPI.save('feedback-form-state', userInfo);
};

// check fields on content

const onFormElSubmit = event => {
  event.preventDefault();

  const inputEmail = document.querySelector('input');
  const inputMessage = document.querySelector('textarea');
  if (inputEmail.value === '' || inputMessage.value === '') {
    return; // Нічого не робимо, якщо одне з полів порожнє
  }
  const inputForm = event.target;

  inputForm.reset();
  localstorageAPI.remove('feedback-form-state');
  userInfo = {};
};

inputForm.addEventListener('input', throttle(formOnChange, 500));
inputForm.addEventListener('submit', onFormElSubmit);
