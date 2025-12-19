import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders registration form', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const headingElement = screen.getByText(/Registration Form/i);
  expect(headingElement).toBeInTheDocument();
});
