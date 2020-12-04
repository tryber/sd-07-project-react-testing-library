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

    const paragrafo1 = 'This application simulates a Pokédex, a digital encliclopedia containing all Pokémons';

    const aplication = getByText(paragrafo1);
    expect(aplication.tagName).toBe('P');

    const paragrafo2 = 'One can filter Pokémons by type, and see more details for each one of them';

    const filter = getByText(paragrafo2);
    expect(filter.tagName).toBe('P');

    const imagems = getByRole(/img/i);
    const imagem ='https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(imagems.src).toBe(imagem);
  });
});
