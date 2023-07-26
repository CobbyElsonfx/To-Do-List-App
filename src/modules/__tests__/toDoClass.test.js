import ToDoClass from '../toDoClass.js';

// Function to mock localStorage
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

describe('ToDoClass', () => {
  let todo;
  let listElementMock;

  beforeEach(() => {
    localStorageMock.clear();
    todo = new ToDoClass();
    listElementMock = document.createElement('ul');
    listElementMock.setAttribute('id', 'list');
    document.querySelector = jest.fn().mockReturnValue(listElementMock);
  });

  test('addActivity should add a new activity', () => {
    const appendChildMock = jest.spyOn(listElementMock, 'appendChild');

    todo.addActivity('Test Activity');

    // Check if the new activity was added to the DOM

    expect(appendChildMock).toHaveBeenCalled();
    expect(listElementMock.children.length).toBe(1);
    expect(todo.listArray.length).toBe(1);
    expect(todo.listArray[0].description).toBe('Test Activity');
    expect(todo.listArray[0]).toEqual({
      description: 'Test Activity',
      completed: false,
      index: 1,
    });
  });

  test('removeActivity should remove an activity', () => {
    todo.addActivity('Activity 1');
    todo.addActivity('Activity 2');

    todo.removeActivity(1);
    expect(todo.listArray.length).toBe(1);
    expect(todo.listArray[0].description).toBe('Activity 2');
    expect(listElementMock.children.length).toBe(1); // Check the length of the <ul> element
  });
});
