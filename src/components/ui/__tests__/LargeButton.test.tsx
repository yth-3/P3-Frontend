import { render, screen } from '@testing-library/react';
import LargeButton from '../LargeButton';

test('renders button with passed in text', () => {
  render(<LargeButton onClick={() => {}}>Large Button Test</LargeButton>);
  const buttonElement = screen.getByText(/Large Button Test/i);
  expect(buttonElement).toBeInTheDocument();
});

test('calls callback function when button is clicked', () => {
  let myVariable;
  function callbackFunction() {
    myVariable = 'the callback was called';
  }
  render(<LargeButton onClick={callbackFunction}>Button</LargeButton>);
  const buttonElement = screen.getByText(/Button/i);
  buttonElement.click();
  expect(myVariable).toEqual('the callback was called');
});
