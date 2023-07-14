import './style.css';
import './assets/update.png';
import './assets/downIcon.png';
import './assets/dots.png';

const activitiesArray = [
  {
    description: 'Dinner',
    completed: true,
    index: 0,
  },
  {
    description: 'Story Book Reading',
    completed: false,
    index: 1,
  },
  {
    description: 'Go to bed',
    completed: false,
    index: 2,
  },
];

const list = document.querySelector('#list');

function displayList() {
  const sortedArr = activitiesArray.sort((a, b) => a.index - b.index);
  sortedArr.forEach((item) => {
    const eachActivity = document.createElement('li');

    eachActivity.className = 'activity';
    eachActivity.innerHTML = `
        <div class="activityDetail">
                    <input type="checkbox" id="${item.index}" class="checker">
                    <label for="${item.index}">${item.description}</label>
                </div>
                <img src="./images/dots.png" alt="Option" class="icons optionBtn">
        `;
    list.appendChild(eachActivity);
  });
}

window.onload = () => {
  displayList();
};