import ToDoClass from './toDoClass.js';

// Helper function to mock localStorage
const localStorageMock = function () {
  let store = {};

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => (store[key] = value.toString()),
    clear: () => (store = {}),
  };
}();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('ToDoClass', () => {
  let todo;
  let listElementMock;

  beforeEach(() => {
    // Clear localStorage and create a new instance of ToDoClass before each test
    localStorageMock.clear();
    todo = new ToDoClass();

    // Create a mock list element and set it as the return value for document.querySelector
    listElementMock = document.createElement('ul');
    listElementMock.setAttribute('id', 'list');
    document.querySelector = jest.fn().mockReturnValue(listElementMock);
  });

  // add new task
  test('addActivity should add a new activity', () => {
    todo.addActivity('Test Activity');
    expect(todo.listArray.length).toBe(1);
    expect(todo.listArray[0].description).toBe('Test Activity');
    expect(todo.listArray[0]).toEqual({
      description: 'Test Activity',
      completed: false,
      index: 1,
    });
  });

  //Remove or delete activity 
  test('removeActivity should remove an activity', () => {
    todo.addActivity('Activity 1');
    todo.addActivity('Activity 2');
    todo.removeActivity(1);
    expect(todo.listArray.length).toBe(1);
    expect(todo.listArray[0].description).toBe('Activity 2');
  });
});
