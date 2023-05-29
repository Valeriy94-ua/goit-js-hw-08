import localstorageAPI from './localstorage.js';

const throttle = require('lodash.throttle');

const inputForm = document.querySelector('form');
inputForm.classList.add('js-form-input');
const userInfo = {};

const fillInputFromLocalStorage = () => {
  const userInfoFromLS = localstorageAPI.load('feedback-form-state');
  if (userInfoFromLS === undefined) {
    return;
  }
  console.log(userInfoFromLS);

  for (let key in userInfoFromLS) {
    inputForm.elements[key].value = userInfoFromLS[key];
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

const onFormElSubmit = event => {
  event.preventDefault();

  const inputForm = event.target;
  inputForm.reset();
  localstorageAPI.remove('feedback-form-state');
};

inputForm.addEventListener('input', throttle(formOnChange, 500));
inputForm.addEventListener('submit', onFormElSubmit);
