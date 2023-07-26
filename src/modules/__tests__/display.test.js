import ToDoClass from '../toDoClass.js';

describe('ToDoClass', () => {
  let todo;
  let listElementMock;

  beforeEach(() => {
    localStorage.clear();
    todo = new ToDoClass();
    listElementMock = document.createElement('ul');
    listElementMock.setAttribute('id', 'list');
    document.querySelector = jest.fn().mockReturnValue(listElementMock);

    // Mock the displayList method
    todo.displayList = jest.fn();
  });

  test('addActivity should add a new activity', () => {
    todo.addActivity('Test Activity');
    expect(todo.listArray.length).toBe(1);
    expect(todo.listArray[0].description).toBe('Test Activity');
    expect(todo.listArray[0]).toEqual({
      description: 'Test Activity',
      completed: false,
      index: 1,
    });
    expect(todo.displayList).toHaveBeenCalledTimes(1);
  });

  test('updateActivity should update the activity description', () => {
    todo.addActivity('Task 1');
    todo.updateActivity('Updated Task 1', 0);
    expect(todo.listArray[0].description).toBe('Updated Task 1');
    expect(todo.displayList).toHaveBeenCalledTimes(2);
  });

  test('removeActivity should remove an activity', () => {
    todo.addActivity('Task 1');
    todo.addActivity('Task 2');
    todo.addActivity('Task 3');
    todo.removeActivity(2);
    expect(todo.listArray.length).toBe(2);
    expect(todo.listArray[0].description).toBe('Task 1');
    expect(todo.listArray[1].description).toBe('Task 3');

    expect(todo.listArray[0].index).toBe(1);
    expect(todo.listArray[1].index).toBe(2);
    expect(todo.displayList).toHaveBeenCalledTimes(4);
  });
});
