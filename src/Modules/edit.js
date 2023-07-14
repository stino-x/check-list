import { ActivityArray, saveTaskstoLocalStorage } from './AddtoLocalStorage.js';

export const changeHTMLforEdit = (e) => {
  const listItem = e.target.closest('li');
  const index = listItem.getAttribute('id');
  if (e.target.classList.contains('fa-solid')) {
    // Remove the existing list item styling and add the edit class
    listItem.classList.remove('listitem');
    listItem.classList.add('edit');
    const taskId = listItem.getAttribute('id');
    // Create the edit form HTML
    const span = document.createElement('span');
    span.classList.add('activity');
    const input = document.createElement('input');
    input.focus();
    input.type = 'text';
    input.classList.add('input-edit');
    input.value = ActivityArray()[taskId].description;
    const trashIcon = document.createElement('box-icon');
    // trashIcon.addEventListener('click', deLete); // event listener
    trashIcon.setAttribute('name', 'trash-alt');
    trashIcon.setAttribute('type', 'solid');
    trashIcon.classList.add('trash');
    span.appendChild(input);
    span.appendChild(trashIcon);
    // Replace the existing HTML with the edit form HTML
    listItem.innerHTML = '';
    listItem.appendChild(span);
    listItem.querySelector('.input-edit').setAttribute('id', `input-edit-${index}`);
  }
};

export const EditTask = (e) => {
  const parent = e.target.parentNode.parentNode;
  const index = parent.getAttribute('id');
  if (e.key === 'Enter' && e.target.classList.contains('input-edit')) {
    const newDescription = e.target.value;
    // editTask(newDescription, index);
    ActivityArray()[index].description = newDescription;
    saveTaskstoLocalStorage();
    parent.innerHTML = `
      <span class="activity td">
      <input type="checkbox" name="" class="check-box"
      ${ActivityArray()[index].completed ? 'checked' : ''}>
      <span class="text">${ActivityArray()[index].description}</span>
      <i class="fa-solid fa-ellipsis-vertical"></i></span>
  `;
    parent.classList.add('listitem');
    parent.classList.remove('edit');
  }
};