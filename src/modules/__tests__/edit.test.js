import ToDoClass from '../toDoClass.js';
import ActivityState from '../activityState.js';

// Helper function to mock localStorage
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
// Replace the global `localStorage` with our mock implementation
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock for document.querySelector
const mockQuerySelector = jest.fn().mockReturnValue(document.createElement('ul'));
document.querySelector = mockQuerySelector;

// Mock for ActivityState
jest.mock('../activityState', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    changeActivity: jest.fn(),
    clearAllItems: jest.fn(),
  })),
}));

describe('ToDoClass Functions', () => {
  let todo;
  let activityStateMock;

  beforeEach(() => {
    localStorageMock.clear();
    todo = new ToDoClass();
    activityStateMock = new ActivityState();
    jest.spyOn(activityStateMock, 'changeActivity');
    jest.spyOn(activityStateMock, 'clearAllItems');
    ActivityState.mockImplementation(() => activityStateMock);
  });

  describe('Function: updateActivity', () => {
    test('should edit the task description', () => {
      // Add a task
      todo.addActivity('Original Task');
      expect(todo.listArray[0].description).toBe('Original Task');

      // Edit the task description
      todo.updateActivity('Updated Task', 0);
      expect(todo.listArray[0].description).toBe('Updated Task');
      expect(todo.listArray[0]).toEqual(
        { description: 'Updated Task', completed: false, index: 1 },
      );
    });
  });
});
