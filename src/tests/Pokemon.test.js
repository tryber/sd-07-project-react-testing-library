import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testando o arquivo Pokemon.js', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[1] } isFavorite={ false } />);
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent(/average weight: 8.5 kg/i);
    const srcExpected = 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png';
    expect(screen.getByRole('img', { name: /charmander sprite/i }).src).toBe(srcExpected);
    expect(screen.getByTestId('pokemonType')).toHaveTextContent('Fire');
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Charmander');
  });
  it('Teste se o card do Pokémon contém um link para exibir detalhes deste Pokémon',
    () => {
      renderWithRouter(<Pokemon pokemon={ pokemons[1] } isFavorite={ false } />);
      expect(screen.getByText(/more details/i).href).toBe('http://localhost/pokemons/4');
    });
  it(`Teste se ao clicar no link de navegação do Pokémon,
    é feito o redirecionamento da aplicação para a página de detalhes de Pokémon`, () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    expect(getByText('Pikachu Details')).toBeInTheDocument();
  });
  it(`Teste também se a URL exibida no navegador muda para /pokemon/<id>,
  onde <id> é o id do Pokémon cujos detalhes se deseja ver;`,
  () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    expect(history.location.pathname).toBe('/pokemons/25');
  });
});

describe('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  it(`O ícone deve ser uma imagem com,
   o atributo src contendo o caminho /star-icon.svg, 
   A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite,
   onde <pokemon> é o nome do Pokémon exibido.`,
  () => {
    const trueFavorite = true;
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ trueFavorite } />);
    expect(screen.getByAltText('Pikachu is marked as favorite').src).toBe('http://localhost/star-icon.svg');
  });
});
