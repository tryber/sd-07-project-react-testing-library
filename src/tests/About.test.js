import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRender from '../renderWithRouter';
import App from '../App';

describe('Testando o arquivo About', () => {
  it('Informações sobre Pokedex', () => {
    const { getByText, history, getByRole } = renderWithRender(<App />);

    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;

    expect(pathname).toBe('/about');

    const aboutPoke = getByText(/About Pokédex/i);
    expect(aboutPoke).toBeInTheDocument();

    const aplication = getByText(/This application simulates a Pokédex, a/i);
    expect(aplication.tagName).toBe('P');

    const filter = getByText(/One can filter Pokémons by type,/i);
    expect(filter.tagName).toBe('P');

    const imagems = getByRole(/img/i);
    const imagem = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(imagems.src).toBe(imagem);
  });
});
