import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';


test('if notFound text is present', () => {
  const { getByText } = render(<NotFound />);
  expect(getByText('Page requested not found')).toBeInTheDocument();
});

test('if notFound text is present', () => {
  const { getAllByRole } = render(<NotFound />);
  expect(getAllByRole('img')[1]).toHaveAttribute(
    'src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif'
  );
});
