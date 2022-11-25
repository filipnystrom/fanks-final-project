import { render, screen } from '@testing-library/react';
import Breathing from './Breathing';

test('renders Breathing without crashing', () => {
  render(<Breathing isRunning={[]}/>);
  const headerElement = screen.getByText('Breathe');
  expect(headerElement).toBeInTheDocument();
});
