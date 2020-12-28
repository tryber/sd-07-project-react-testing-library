import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithrouter';

test('if contains a h2 with the correct information', () => {
  const { getAllByRole, history } = renderWithRouter(<App />);
  history.push('nonexistentLink');
  const information = getAllByRole('heading', {
    name: /Page requested not found Crying emoji/i,
  });
  expect(information[0]).toBeInTheDocument();
  console.log(information[0]);
});

test('if contains an image with the correct URL', () => {
  const { container, history } = renderWithRouter(<App />);
  history.push('nonexistentLink');
  const imgURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const imgs = container.getElementsByTagName('img');
  const imageIndex = 0;
  expect(imgs.item(imageIndex).src).toBe(imgURL);
});
