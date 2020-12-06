import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import About from '../components/About';

describe('testing About.js functionality', () => {
  it('Should conteins info about Pokédex on document', () => {
    const { getByText } = renderWithRouter(<About />);

    const infosAboutPokedex = getByText(/This application simulates a Pokédex/i);
    expect(infosAboutPokedex).toBeInTheDocument();
  });

  it('Should coteins a tag h2 in the document', () => {
    const { getByText, getByRole, getByAltText } = renderWithRouter(<About />);

    const header2 = getByRole('heading', { level: 2 });
    expect(header2).toBeInTheDocument();
    expect(header2.tagName.toLowerCase()).toBe('h2');
    const header2Text = getByText(/About Pokédex/i);
    expect(header2Text).toBeInTheDocument();
    const numberToComper = 2;
    const pAboutPokedex = document.querySelectorAll('p');
    expect(pAboutPokedex.length).toBe(numberToComper);
    const pText1 = getByText(/This application simulates a Pokédex/i);
    expect(pText1).toBeInTheDocument();
    const pText2 = getByText(/One can filter Pokémons by type/i);
    expect(pText2).toBeInTheDocument();

    const imgOfPokedexURL = getByAltText('Pokédex');
    expect(imgOfPokedexURL).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
