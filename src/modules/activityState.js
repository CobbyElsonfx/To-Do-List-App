export default class ActivityState {
    // Storing checked activit]ies
    changeActivity = (array, index) => {
      array[index].completed = !array[index].completed;
      localStorage.setItem('taskStorage', JSON.stringify(array));
    };

    // Function to remove all completed item
    clearAllItems = (array) => {
      array = array.filter((object) => object.completed !== true);
      array.forEach((element, index) => {
        element.index = (index + 1);
      });
      localStorage.setItem('taskStorage', JSON.stringify(array));
      document.location.reload();
    };
}