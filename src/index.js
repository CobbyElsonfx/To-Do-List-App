import './style.css';
import './assets/update.png';
import './assets/downIcon.png';
import './assets/dots.png';
import './assets/delete.png';
import ActivityState from './modules/activityState.js';
import ToDoClass from './modules/toDoClass.js';

const activityState = new ActivityState();
const listOfActivities = new ToDoClass();

const updateListBtn = document.querySelector('.updateListBtn');
const addButton = document.querySelector('.addButton');
const inputText = document.querySelector('.inputText');
const clearBtn = document.querySelector('#clearBtn');

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

clearBtn.onclick = () => {
  activityState.clearAllItems(listOfActivities.listArray);
  document.location.reload();
};

window.onload = () => {
  listOfActivities.displayList();
};
