import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/My Raptor App/i);
  expect(linkElement).toBeInTheDocument();
});

test('render RaptorTable in document', () => {
  const component = render(<App />)
  const childElement = component.getByLabelText(/Card Number/i);
  expect(childElement).toBeTruthy();
})
