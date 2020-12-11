import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('if a page contains an h2 header with the text \'Requested page not found 😭\'',
  () => {
    const {
      getByText,
      getByLabelText,
      getAllByRole,
      history,
    } = renderWithRouter(<App />);

    history.push('/xablau');
    expect(history.location.pathname).toBe('/xablau');

    const header = getByText('Page requested not found');
    expect(header).toBeInTheDocument();

    const emoji = getByLabelText('Crying emoji');
    expect(emoji).toBeInTheDocument();

    const pikachuImg = getAllByRole('img')[1];
    expect(pikachuImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
