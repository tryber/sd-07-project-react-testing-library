import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testando o arquivo Pokemon.js', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const weight = screen.getByTestId('pokemon-weight');
    const img = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(weight).toHaveTextContent(/average weight: 6.0 kg/i);
    expect(img.src).toBe(
      'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });
  it(`Teste se o card do Pokémon indicado na Pokédex contém um link de navegação
   para exibir detalhes deste Pokémon.
   O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido`, () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);
    const url = screen.getByText(/More details/i);
    expect(url.href).toBe('http://localhost/pokemons/25');
  });
  it(`Teste se ao clicar no link de navegação do Pokémon,
  é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.`, () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const url = screen.getByText(/More details/i);
    fireEvent.click(url);
    const pikachuDetails = screen.getByText('Pikachu Details');
    expect(pikachuDetails).toBeInTheDocument();
  });
  it(`Teste também se a URL exibida no navegador muda para /pokemon/<id>,
  onde <id> é o id do Pokémon cujos detalhes se deseja ver;`, () => {
    const { getByText, history } = renderWithRouter(
      <App pokemon={ pokemons[0] } isFavorite={ false } />,
    );
    const url = getByText(/More details/i);
    fireEvent.click(url);
    const pathName = history.location.pathname;

    expect(pathName).toBe('/pokemons/25');
  });
  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite="true" />);

    const img = screen.getByAltText('Pikachu is marked as favorite');
    expect(img.src).toBe('http://localhost/star-icon.svg');
  });
  it('Teste se existe um Campo com o tipo do pokemon.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite="true" />);

    const typePokemon = screen.getByTestId('pokemonType');
    const namePokemon = screen.getByTestId('pokemon-name');

    expect(typePokemon).toHaveTextContent('Electric');
    expect(namePokemon).toHaveTextContent('Pikachu');
  });
});
