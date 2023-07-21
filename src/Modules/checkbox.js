import {
  ActivityArray, AddToScreen, saveTaskstoLocalStorage, setActivityArray,
} from './AddtoLocalStorage.js';

export const handleCheckboxchange = (event) => {
  const checkbox = event.target;
  if (checkbox.type === 'checkbox') {
    const listItem = checkbox.closest('li');
    const taskId = listItem.getAttribute('id');
    ActivityArray()[taskId].completed = checkbox.checked;
    saveTaskstoLocalStorage();
    if (checkbox.checked) {
      listItem.querySelector('.text').classList.add('completed');
    } else {
      listItem.querySelector('.text').classList.remove('completed');
    }
    saveTaskstoLocalStorage();
  }
};

//   activitleCheckboxchange);
//   activiteTask);
// deleting all checked tasks
export const deleteCheckedTasks = () => {
  setActivityArray(ActivityArray().filter((MyConstructor) => !MyConstructor.completed));
  saveTaskstoLocalStorage();
  AddToScreen();
};
export const reIndex = () => {
  ActivityArray().forEach((task, index) => {
    task.index = index + 1;
  });
};
  // button for dleting all checked tasks
export const cLearALL = () => {
  deleteCheckedTasks();
  reIndex();
  saveTaskstoLocalStorage();
  AddToScreen();
};

const loadActivityArrayFromLocalStorage = () => {
  const activityArrayString = localStorage.getItem('activities');
  if (activityArrayString) {
    return JSON.parse(activityArrayString);
  }
  return [];
};

const activityArray1 = loadActivityArrayFromLocalStorage();

activityArray1.forEach((task, index) => {
  const listItem = document.getElementById(index);
  if (task.completed) {
    listItem.querySelector('.text').classList.add('completed');
  }
});
//   ALL);