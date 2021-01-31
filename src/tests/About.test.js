import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import About from '../components/About';

describe('Requisito 2: Testando o arquivo About.js', () => {
  it('Testa se a página contém as informações sobre a Pokédex', () => {
    const { queryByText, history } = renderWithRouter(<About />);
    history.push('/about');

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const aboutCaption = queryByText(/About Pokédex/i);
    expect(aboutCaption).toBeInTheDocument();
  });

  it('Testa se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutCaption = getByRole('heading');

    expect(aboutCaption).toHaveTextContent(/About Pokédex/i);
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = renderWithRouter(<About />); // Source: https://trybecourse.slack.com/archives/C016CCMKN9E/p1603226642099900
    const TWO = 2;
    const getParagraphsElements = container.querySelectorAll('p');
    expect(getParagraphsElements.length).toBe(TWO);
  });

  it('Testa se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const imageElement = getByRole('img');
    const imageURL = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    // console.log(imageElement);
    expect(imageElement.src).toBe(imageURL);
  });
});
