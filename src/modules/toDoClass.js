import ActivityState from './activityState.js';

const activityState = new ActivityState();

export default class ToDoClass {
  constructor() {
    this.listArray = JSON.parse(localStorage.getItem('taskStorage')) || [];
  }

  displayList = () => {
    const list = document.querySelector('#list');
    list.innerHTML = '';
    this.listArray.forEach((Item, index) => {
      const activity = document.createElement('li');
      activity.className = 'activity';

      const activityDetail = document.createElement('div');
      activityDetail.className = 'activityDetail';

      const checker = document.createElement('input');
      checker.type = 'checkbox';
      checker.className = 'checker';
      checker.checked = Item.completed;
      checker.addEventListener('change', () => {
        activityState.changeActivity(this.listArray, index);
      });
      activityDetail.appendChild(checker);

      const ItemDescription = document.createElement('input');
      ItemDescription.type = 'text';
      ItemDescription.className = 'itemDescription';
      ItemDescription.value = Item.description || ''; // Provide a default value in case Item.description is undefined
      ItemDescription.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && ItemDescription.value) {
          this.updateActivity(ItemDescription.value, index);
        }
      });
      activityDetail.appendChild(ItemDescription);
      activity.appendChild(activityDetail);

      const removeBtn = document.createElement('img');
      removeBtn.src = './images/delete.png';
      removeBtn.alt = 'Delete';
      removeBtn.className = 'icons removeBtn';
      removeBtn.addEventListener('click', () => {
        this.removeActivity(index + 1);
      });
      activity.appendChild(removeBtn);
      list.appendChild(activity);
    });
  }

  addActivity = (value) => {
    const arrayItem = {};
    arrayItem.description = value;
    arrayItem.completed = false;
    arrayItem.index = (this.listArray.length + 1);
    this.listArray.push(arrayItem);
    localStorage.setItem('taskStorage', JSON.stringify(this.listArray));
    this.displayList();
  }
  
  updateActivity = (value, index) => {
    this.listArray[index].description = value;
    localStorage.setItem('taskStorage', JSON.stringify(this.listArray));
    this.displayList();
  }

  removeActivity = (value) => {
    this.listArray = this.listArray.filter((Item) => Item.index !== value);
    this.listArray.forEach((Item, index) => {
      Item.index = (index + 1);
    });
    localStorage.setItem('taskStorage', JSON.stringify(this.listArray));
    this.displayList();
  }
}
