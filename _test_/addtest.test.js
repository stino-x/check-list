import { ActivityArray, AddtoLocalStorage, saveTaskstoLocalStorage } from '../src/Modules/AddtoLocalStorage.js';
import { inputArea } from '../src/index.js';
import DeleteTask from '../src/Modules/Delete.js';

jest.mock('../src/style.css', () => ({}));
// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
const ActivityArray1 = ActivityArray();
// Test for the AddtoLocalStorage function
describe('AddtoLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    ActivityArray1.length = 0;
  });

  test('should add a task to ActivityArray1 and localStorage', () => {
    inputArea.value = 'New Task';

    AddtoLocalStorage();
    saveTaskstoLocalStorage();

    expect(ActivityArray1.length).toBe(1);
    expect(ActivityArray1[0].description).toBe('New Task');
    expect(ActivityArray1[0].completed).toBe(false);
    expect(ActivityArray1[0].index).toBe(ActivityArray1.length);

    const storedData = JSON.parse(localStorage.getItem('activities'));
    expect(storedData.length).toBe(1);
    expect(storedData[0].description).toBe('New Task');
    expect(storedData[0].completed).toBe(false);
    expect(storedData[0].index).toBe(ActivityArray1.length);
  });
});

// Test for the DeleteTask function
describe('DeleteTask', () => {
  beforeEach(() => {
    localStorage.clear();
    ActivityArray1.length = 0;
    saveTaskstoLocalStorage();
  });

  test('should remove a task from ActivityArray1 and localStorage', () => {
    // Add a task to ActivityArray1 and localStorage
    const task = { description: 'Task 1', completed: false, index: 1 };
    ActivityArray1.push(task);
    saveTaskstoLocalStorage();

    // Simulate the delete event
    const listItem = document.createElement('li');
    listItem.setAttribute('id', '0');
    const input = document.createElement('input');
    input.focus();
    input.type = 'text';
    input.classList.add('input-edit');
    input.value = ActivityArray1[listItem.getAttribute('id')].description;
    const trashIcon = document.createElement('box-icon');
    trashIcon.classList.add('trash');
    const parentNode = document.createElement('span');
    parentNode.appendChild(input);
    parentNode.appendChild(trashIcon);
    listItem.appendChild(parentNode);

    const event = {
      target: trashIcon,
    };

    DeleteTask(event);

    expect(ActivityArray1.length).toBe(0);
    expect(localStorage.getItem('activities')).toBe(null);
  });
});