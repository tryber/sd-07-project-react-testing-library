import React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testando o arquivo PokemonDetails.js, requisito 7', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado na tela.', () => {
    const { getByRole, getByText, getByTestId } = renderWithRouter(<App />);
    const next = getByTestId('next-pokemon');
    fireEvent.click(next);
    const details = getByRole('link', { name: 'More details' });
    expect(details).toBeInTheDocument();
    fireEvent.click(details);
    const nameDetails = getByText(/Charmander Details/i);
    expect(nameDetails).toBeInTheDocument();
    expect(details).not.toBeInTheDocument();
    const heading = document.querySelectorAll('h2')[1];
    expect(heading.tagName.toLowerCase()).toBe('h2');
    expect(heading.innerHTML).toBe('Summary');
    const paragraphy = getByText(/The flame on its tail shows the strength./i);
    expect(paragraphy).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações.', () => {
    const { getByRole, getByText, getByTestId, getAllByAltText } = renderWithRouter(
      <App />,
    );
    const next = getByTestId('next-pokemon');
    fireEvent.click(next);
    const details = getByRole('link', { name: 'More details' });
    expect(details).toBeInTheDocument();
    fireEvent.click(details);
    const heading = document.querySelectorAll('h2')[2];
    expect(heading.tagName.toLowerCase()).toBe('h2');
    expect(heading.innerHTML).toBe('Game Locations of Charmander');
    const locale1 = getByText(/Alola Route 3/i);
    expect(locale1).toBeInTheDocument();
    const locale2 = getByText(/Kanto Route 3/i);
    expect(locale2).toBeInTheDocument();
    const locale3 = getByText(/Kanto Route 4/i);
    expect(locale3).toBeInTheDocument();
    const locale4 = getByText(/Kanto Rock Tunnel/i);
    expect(locale4).toBeInTheDocument();
    const image = getAllByAltText('Charmander location');
    expect(image[0]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png');
    expect(image[1]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png');
    expect(image[2]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png');
    expect(image[3]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png');
  });

  it('Teste se o usuário pode favoritar um pokémon através da página detalhes.', () => {
    const { getByRole, getByLabelText } = renderWithRouter(<App />);
    const details = getByRole('link', { name: 'More details' });
    fireEvent.click(details);
    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeTruthy();
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeFalsy();
    const favorite = getByLabelText(/Pokémon favoritado?/i);
    expect(favorite).toBeInTheDocument();
  });
});
