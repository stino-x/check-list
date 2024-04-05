import { ActivityArray, AddToScreen, saveTaskstoLocalStorage } from './AddtoLocalStorage.js';

const DeleteTask = (e) => {
  if (e.target.classList.contains('trash')) {
    const listItem = e.target.parentNode.parentNode;
    const taskIndex = listItem.getAttribute('id');
    // const taskIndex = Array.from(listItem.parentNode.children).indexOf(listItem) - 1;
    ActivityArray().splice(taskIndex, 1);
    saveTaskstoLocalStorage();
    AddToScreen();
  }
};
export default DeleteTask;