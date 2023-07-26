import ActivityState from '../activityState.js';

describe('Testing updating and clearing items functionality', () => {
  describe('ActivityState.clearAllItems', () => {
    it('should clear all completed items', () => {
      // Create a sample list of items with some completed and some not completed
      const list = [
        { description: 'Task 1', completed: true, index: 1 },
        { description: 'Task 2', completed: false, index: 2 },
        { description: 'Task 3', completed: true, index: 3 },
        { description: 'Task 4', completed: false, index: 4 },
      ];

      // Mock the localStorage to avoid side effects
      const localStorageMock = (() => {
        let store = {};

        return {
          getItem: (key) => store[key] || null,
          setItem: (key, value) => {
            store[key] = value.toString();
          },
          clear: () => {
            store = {};
          },
        };
      })();

      Object.defineProperty(window, 'localStorage', { value: localStorageMock });

      // Create an instance of ActivityState
      const activityState = new ActivityState();

      // Call the clearAllItems method with the sample list
      activityState.clearAllItems(list);

      // Check the behavior of the function
      const filteredArray = JSON.parse(localStorageMock.getItem('taskStorage'));
      expect(filteredArray.length).toBe(2);
      expect(filteredArray[0].description).toBe('Task 2');
      expect(filteredArray[1].description).toBe('Task 4');
      expect(filteredArray[0].completed).toBe(false);
      expect(filteredArray[1].completed).toBe(false);
      expect(filteredArray[0].index).toBe(1);
      expect(filteredArray[1].index).toBe(2);
    });
  });

  describe('ActivityState.changeActivity', () => {
    it('should toggle the completed status of an item', () => {
      // Create a sample list of items with one completed item
      const list = [
        { description: 'Task 1', completed: true, index: 1 },
        { description: 'Task 2', completed: false, index: 2 },
        { description: 'Task 3', completed: false, index: 3 },
      ];

      // Create an instance of ActivityState
      const activityState = new ActivityState();

      // Call the changeActivity method to toggle the completed status of the second item
      activityState.changeActivity(list, 1);

      // Check if the completed status of the second item is toggled
      expect(list[1].completed).toBe(true);
    });
  });
});
