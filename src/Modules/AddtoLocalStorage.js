const inputArea = document.querySelector('#input');
export const activitySection = document.querySelector('#activity-list');

let activityArray = [];
export const ActivityArray = () => activityArray;
export const setActivityArray = (newArray) => {
  activityArray = newArray;
};
const Form = document.querySelector('form');
if (localStorage.getItem('activities')) {
  activityArray = JSON.parse(localStorage.getItem('activities'));
}
export function MyConstructor(description, completed, index) {
  this.description = description;
  this.completed = completed;
  this.index = index;
}

export const AddToScreen = () => {
  activitySection.innerHTML = '';
  activityArray.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('section', 'listitem');
    li.id = index;

    const span = document.createElement('span');
    span.classList.add('activity', 'td');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = '';
    checkbox.classList.add('check-box');
    checkbox.checked = task.completed;

    const taskDescription = document.createElement('span');
    taskDescription.classList.add('text');
    taskDescription.textContent = task.description;

    const ellipsis = document.createElement('i');
    ellipsis.classList.add('fa-solid', 'fa-ellipsis-vertical');

    span.appendChild(checkbox);
    span.appendChild(taskDescription);
    span.appendChild(ellipsis);

    li.appendChild(span);

    activitySection.appendChild(li);
  });
};

if (activityArray.length > 0) {
  AddToScreen();
}

export const saveTaskstoLocalStorage = () => {
  localStorage.setItem('activities', JSON.stringify(activityArray));
};

export const AddtoLocalStorage = () => {
  const description = inputArea.value.trim();
  const completed = false;
  const Index = activityArray.length + 1;
  const Object = new MyConstructor(description, completed, Index);
  activityArray.push(Object);
  saveTaskstoLocalStorage();
  AddToScreen();
};

export const clickToAddNewTask = () => {
  if (inputArea.value !== '') {
    AddtoLocalStorage();
    saveTaskstoLocalStorage();
    AddToScreen();
    Form.reset();
  }
};

export const submitForm = (event) => {
  if (inputArea.value !== '') {
    event.preventDefault();
    AddtoLocalStorage();
    saveTaskstoLocalStorage();
    AddToScreen();
  }
  Form.reset();
};
