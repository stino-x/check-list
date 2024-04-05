import './style.css';
import reFreshPage from './Modules/refresh.js';
import { EditTask, changeHTMLforEdit } from './Modules/edit.js';
import { clickToAddNewTask, submitForm } from './Modules/AddtoLocalStorage.js';
import { cLearALL, handleCheckboxchange } from './Modules/checkbox.js';
import DeleteTask from './Modules/Delete.js';

export const inputArea = document.querySelector('#input');
export const Form = document.querySelector('form');
const clearAll = document.querySelector('button');

const enter = document.querySelector('#enter');
export const activitySection = document.querySelector('#activity-list');

activitySection.addEventListener('dblclick', changeHTMLforEdit);

Form.addEventListener('submit', submitForm);

enter.addEventListener('dblclick', clickToAddNewTask);

activitySection.addEventListener('change', handleCheckboxchange);

activitySection.addEventListener('click', DeleteTask);

clearAll.addEventListener('click', cLearALL);

document.addEventListener('click', reFreshPage);

activitySection.addEventListener('keypress', EditTask);