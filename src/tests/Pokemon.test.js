import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testando Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    const nome = getByTestId('pokemon-name');
    expect(nome).toBeInTheDocument();
    expect(nome).toHaveTextContent(/Pikachu/i);

    const tipo = getByTestId('pokemonType');
    expect(tipo).toBeInTheDocument();
    expect(tipo.innerHTML).toBe('Electric');

    const peso = getByTestId('pokemon-weight');
    expect(peso).toBeInTheDocument();
    expect(peso.innerHTML).toBe('Average weight: 6.0 kg');

    const imagem = getByAltText('Pikachu sprite');
    expect(imagem).toBeInTheDocument();
    expect(imagem).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png'
    );
  });

  it('Teste se o card do Pokémon contém um link de navegação.', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkDetalhes = getByText('More details');
    expect(linkDetalhes).toBeInTheDocument();
    expect(linkDetalhes).toHaveAttribute('href', '/pokemons/25');
  });

  it('Teste se clicando no link de navegação do Pokémon ocorre redirecionamento', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const linkDetalhes = getByRole('link', { name: 'More details' });
    fireEvent.click(linkDetalhes);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByText, getByAltText, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const botaoFavorito = getByText('Pokémon favoritado?');
    fireEvent.click(botaoFavorito);
    const imagem = getByAltText('Pikachu is marked as favorite');
    expect(imagem.src).toEqual('http://localhost/star-icon.svg');
  });
});
