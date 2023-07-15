import './style.css';
import './assets/update.png';
import './assets/downIcon.png';
import './assets/dots.png';
import './assets/delete.png';

import ToDoClass from './modules/toDoClass.js';

const listOfActivities = new ToDoClass();

const updateListBtn = document.querySelector('.updateListBtn');
const addButton = document.querySelector('.addButton');
const inputText = document.querySelector('.inputText');

updateListBtn.onclick = () => {
  document.location.reload();
};

addButton.onclick = () => {
  listOfActivities.addActivity(inputText.value);
  inputText.value = '';
};

inputText.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' && inputText.value) {
    listOfActivities.addActivity(inputText.value);
    inputText.value = '';
  }
});

window.onload = () => {
  listOfActivities.displayList();
};
