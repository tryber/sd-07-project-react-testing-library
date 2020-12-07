import React from 'react';
import { cleanup, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const getPokemonName = () => screen.getByTestId(/pokemon-name/i).textContent;

const clickNext = (callback) => {
  const btnText = 'Próximo pokémon';
  const nextBtn = screen.getByRole('button', { name: btnText });
  pokemons.forEach(() => {
    const pokemonName = getPokemonName();
    callback(pokemonName);
    fireEvent.click(nextBtn);
  });
};

describe('Teste se é renderizado um card com'
+ ' as informações de determinado pokémon.', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
  });
  afterEach(cleanup);
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    clickNext((pokemonName) => {
      const { name: expectedName } = pokemons.find(({ name }) => name === pokemonName);
      expect(expectedName).toBe(pokemonName);
    });
  });
  it('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    clickNext((pokemonName) => {
      const { type } = pokemons.find(({ name }) => name === pokemonName);
      const { textContent: pokemonType } = screen.getByTestId('pokemonType');
      expect(type).toBe(pokemonType);
    });
  });
  it('O peso médio do pokémon deve ser exibido', () => {
    clickNext((pokemonName) => {
      const { averageWeight: { value, measurementUnit } } = pokemons
        .find(({ name }) => name === pokemonName);
      const expectedWeight = `Average weight: ${value} ${measurementUnit}`;
      const { textContent: pokemonWeight } = screen.getByTestId('pokemon-weight');
      expect(expectedWeight).toBe(pokemonWeight);
    });
  });
  it('A imagem do Pokémon deve ser exibida. ', () => {
    clickNext((pokemonName) => {
      const { image: expectedSrc } = pokemons
        .find(({ name }) => name === pokemonName);
      const { src } = screen.getByAltText(`${pokemonName} sprite`);
      expect(expectedSrc).toBe(src);
    });
  });
});

describe('este se o card do Pokémon indicado na Pokédex '
+ 'contém um link de navegação para exibir detalhes deste Pokémon.'
+ 'O link deve possuir a URL /pokemons/<id>, onde '
+ '<id> é o id do Pokémon exibido;', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
  });
  afterEach(cleanup);
  it('contém um link de navegação', () => {
    const link = screen.getByRole('link', { name: /more details/i });
    expect(link).toBeInTheDocument();
  });
  it('O link deve possuir a URL /pokemons/<id>.', () => {
    const { href } = screen.getByRole('link', { name: /more details/i });
    const pokemonName = getPokemonName();
    const { name } = pokemons.find(({ id }) => href.includes(id));
    expect(name === pokemonName).toBeTruthy();
  });
});

describe('este se o card do Pokémon indicado na Pokédex '
+ 'contém um link de navegação para exibir detalhes deste Pokémon.'
+ 'O link deve possuir a URL /pokemons/<id>, onde '
+ '<id> é o id do Pokémon exibido;', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
  });
  afterEach(cleanup);
  it('contém um link de navegação', () => {
    const link = screen.getByRole('link', { name: /more details/i });
    expect(link).toBeInTheDocument();
  });
  it('O link deve possuir a URL /pokemons/<id>.', () => {
    const { href } = screen.getByRole('link', { name: /more details/i });
    const pokemonName = getPokemonName();
    const { name } = pokemons.find(({ id }) => href.includes(id));
    expect(name === pokemonName).toBeTruthy();
  });
});
describe('Teste se ao clicar no link de navegação do Pokémon, é feito'
+ ' o redirecionamento da aplicação para a página '
+ 'de detalhes de Pokémon.', () => {
  afterEach(cleanup);
  it('É feito o redirecionamento da aplicação para a página', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const link = screen.getByRole('link', { name: /more details/i });
    const { href } = link;
    fireEvent.click(link);
    const { pathname } = history.location;
    expect(href).toBe(`http://localhost${pathname}`);
  });
});
describe('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  afterEach(cleanup);
  it('O ícone deve ser uma imagem com o atributo src contendo o caminho', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const link = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(link);
    const checkBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    if (!checkBox.checked) fireEvent.click(checkBox);
    const expectTextAlt = 'Pikachu is marked as favorite';
    const { src, alt } = screen.getByAltText(expectTextAlt);
    const pokemonName = getPokemonName();
    const srcImgExpect = 'http://localhost/star-icon.svg';
    const altImgExpect = `${pokemonName} is marked as favorite`;
    expect(srcImgExpect).toBe(src);
    expect(altImgExpect).toBe(alt);
  });
});
