import React from 'react';
import { fireEvent } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';
import App from '../App';

const favorite = true;
describe('Testando o arquivo Pokemon.js', () => {
  it('Teste o card com o nome dos pokémons.', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ favorite } />,
    );
    const nome = getByTestId('pokemon-name');
    expect(nome.textContent).toBe('Pikachu');
  });

  it('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ favorite } />,
    );
    const tipo = getByTestId('pokemonType');
    expect(tipo.textContent).toBe('Electric');
  });

  it('O peso médio do pokémon deve ser exibido.', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ favorite } />,
    );
    const peso = getByTestId('pokemon-weight');
    expect(peso.innerHTML).toBe('Average weight: 6.0 kg');
  });

  it('A imagem do Pokémon deve ser exibida. ', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ favorite } />,
    );
    const img = getByAltText(`${pokemons[0].name} sprite`);
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img.alt).toBe('Pikachu sprite');
  });
});

describe('Testando o link do arquivo', () => {
  it('Teste se o card da Pokédex contém um link. ', () => {
    const { getByText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ favorite } />,
    );
    const link = getByText('More details');
    expect(link.tagName).toBe('A');
  });

  it('O link deve possuir a URL /pokemons/<id>', () => {
    const { getByText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ favorite } />,
    );
    const link = getByText('More details');
    expect(link.href).toBe('http://localhost/pokemons/25');
  });

  it('Ao clicar no link, deve ir para a página de detalhes.', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    const detailsPage = getByText('Summary');
    expect(detailsPage).toBeInTheDocument();
  });

  it('A URL deve mudar para /pokemon/<id>', () => {
    const { getByText, history } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ favorite } />,
    );
    const detailsLink = getByText('More details');
    fireEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
});

describe('Teste se tem uma estrela nos Pokémons favoritados.', () => {
  it('Deve haver uma imagem src no caminho /star-icon.svg', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ favorite } />,
    );
    const image = getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(image.src).toBe('http://localhost/star-icon.svg');
  });

  it('A imagem deve conter alt igual a <pokemon>.', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ favorite } />,
    );
    const image = getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(image.alt).toBe('Pikachu is marked as favorite');
  });
});
