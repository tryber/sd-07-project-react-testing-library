import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testando Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    const nome = getByTestId('pokemon-name');
    expect(nome).toHaveTextContent(/Pikachu/i);
    expect(nome).toBeInTheDocument();
    const tipo = getByTestId('pokemonType');
    expect(tipo).toBeInTheDocument();
    const peso = getByTestId('pokemon-weight');
    expect(peso).toBeInTheDocument();
    const imagem = getByAltText('Pikachu sprite');
    expect(imagem).toBeInTheDocument();
    expect(imagem).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    );
  });

  it('Teste se o card do Pokémon contém um link de navegação.', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkDetalhes = getByText('More details');
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
