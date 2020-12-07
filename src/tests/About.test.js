import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import About from '../components/About';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};
describe('Testing the About.js file', () => {
  it('Test whether the page contains information about Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const infoAssert = getByText(/a digital encliclopedia containing all Pokémons/i);
    expect(infoAssert).toBeInTheDocument();
  });
  it('Test whether page contains h2 and inside text About Pokédex.', () => {
    const { container } = renderWithRouter(<About />);
    const tagConfirm = container.querySelector('h2').innerHTML;
    expect(tagConfirm).toBe('About Pokédex');
  });
  it('Test if the page contains two paragraphs with text about Pokédex.', () => {
    const { container } = renderWithRouter(<About />);
    const tagsP = container.querySelectorAll('p');
    const numberMagic = 2;
    expect(tagsP.length).toBe(numberMagic);
  });
  it('Test if the page contains the image of a Pokédex:', () => {
    const { container } = renderWithRouter(<About />);
    const urlImage = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = container.querySelector('img').src;
    expect(urlImage).toBe(image);
  });
});
// Link consultado:
// https://app.betrybe.com/course/front-end/react/tests/rtl-react-router
// https://app.betrybe.com/course/front-end/react/tests/rtl-queries-events-asyncq
// https://www.youtube.com/watch?v=ZmVBCpefQe8
// https://www.youtube.com/watch?v=sdkgUu5hr6g
