// jest.setup.js

import { Form } from './src/index.js';
import { activitySection } from './src/Modules/AddtoLocalStorage.js';

// Mock the addEventListener method for the activitySection element
global.activitySection = {
  addEventListener: jest.fn(),
};

// Mock the addEventListener method for the Form element
global.Form = {
  addEventListener: jest.fn(),
};

// Add event listeners to the mocked DOM elements
beforeEach(() => {
  activitySection.addEventListener.mockClear();
  Form.addEventListener.mockClear();

  activitySection.addEventListener.mockImplementation((event, listener) => {
    // Mock the event listener for 'dblclick' event
    if (event === 'dblclick') {
      global.changeHTMLforEdit = listener;
    }
  });

  Form.addEventListener.mockImplementation((event, listener) => {
    // Mock the event listener for 'submit' event
    if (event === 'submit') {
      global.submitForm = listener;
    }
  });
});
