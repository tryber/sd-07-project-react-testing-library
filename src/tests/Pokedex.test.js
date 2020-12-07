import React from 'react';
import { cleanup, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const getTypes = () => [
  ...new Set(pokemons.reduce((types, { type }) => [...types, type], [])),
];

const testClickNext = (list = pokemons, callback = () => {}) => {
  const btnText = 'Próximo pokémon';
  const nextBtn = screen.getByRole('button', { name: btnText });
  return list.forEach(({ name }) => {
    const pokemonName = screen.queryByTestId('pokemon-name');
    expect(name).toBe(pokemonName.innerHTML);
    callback();
    fireEvent.click(nextBtn);
  });
};

describe('Contém um h2 com o texto Encountered pokémons', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
  });
  afterEach(cleanup);
  it('Contém texto Encountered pokémons', () => {
    const heading = 'Encountered pokémons';
    const p = screen.getByRole('heading', { name: heading });
    expect(p).toBeInTheDocument();
  });
});
describe('Teste se é exibido o próximo Pokémon quando clicado.', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
  });
  afterEach(cleanup);
  it('O botão deve conter o texto Próximo pokémon;', () => {
    const btnText = 'Próximo pokémon';
    const nextBtn = screen.getByRole('button', { name: btnText });
    expect(nextBtn).toBeInTheDocument();
  });
  it('Ao clicar, mostrar próximos pokemons', () => {
    testClickNext();
  });
});
describe('Teste se é mostrado apenas um Pokémon por vez.', () => {
  afterEach(cleanup);
  it('Mostrado apenas um Pokémon por vez.', () => {
    const { history, container } = renderWithRouter(<App />);
    history.push('/');
    testClickNext(pokemons, () => {
      const element = container.querySelectorAll('.pokemon');
      expect(element.length).toBe(1);
    });
  });
});
describe('Teste se a Pokédex tem os botões de filtro.', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
  });
  afterEach(cleanup);
  it('Pokédex deve circular somente pelos pokémons daquele tipo;', () => {
    const typesInBar = screen.queryAllByTestId('pokemon-type-button');
    expect(getTypes().length).toBe(typesInBar.length);
  });
  it('O texto do botão deve corresponder ao nome do tipo', () => {
    const typesInBar = screen.queryAllByTestId('pokemon-type-button');
    typesInBar.forEach(({ innerHTML: typeBtn }) => {
      expect(getTypes().includes(typeBtn)).toBeTruthy();
    });
  });
});
describe('Contém um h2 com o texto Encountered pokémons', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
  });
  afterEach(cleanup);
  it('Contém texto Encountered pokémons', () => {
    const heading = 'Encountered pokémons';
    const p = screen.getByRole('heading', { name: heading });
    expect(p).toBeInTheDocument();
  });
});
describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
  });
  afterEach(cleanup);
  it('O texto do botão deve ser All', () => {
    const text = 'All';
    const btn = screen.getByRole('button', { name: text });
    expect(btn.innerHTML).toBe(text);
  });
  it('A Pokedéx deverá mostrar os Pokémons sem filtros', () => {
    getTypes().forEach((typeIn) => {
      const btn = screen.getByRole('button', { name: typeIn });
      fireEvent.click(btn);
      const pokemonList = pokemons.filter(({ type }) => typeIn === type);
      testClickNext(pokemonList);
    });
    const btnDragon = screen.getByRole('button', { name: /dragon/i });
    fireEvent.click(btnDragon);
    const btnAll = screen.getByRole('button', { name: /All/i });
    fireEvent.click(btnAll);
    testClickNext();
  });
  it('Ao carregar a página, o filtro selecionado deverá ser All;', () => {
    testClickNext();
  });
});
describe('Criado um botão de filtro para cada tipo de Pokémon.', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
  });
  afterEach(cleanup);
  it('Existi um botão para cada tipo de Pokémon disponível', () => {
    getTypes().forEach((type) => {
      const buttonType = screen.getByRole('button', { name: `${type}` });
      expect(buttonType).toBeInTheDocument();
    });
  });
  it('Filtragem para cada tipo de Pokémon, sem repetição', () => {
    const typeButtons = screen.queryAllByTestId('pokemon-type-button');
    expect(getTypes().length).toBe(typeButtons.length);
  });
  it('desabilitado quando a lista filtrada de Pokémons tiver um só pokémon.', () => {
    testClickNext();
  });
});
describe('Teste se é mostrado apenas um Pokémon por vez.', () => {
  afterEach(cleanup);
  it(' botão de Próximo pokémon deve ser desabilitado', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const btn = screen.getByRole('button', { name: /dragon/i });
    fireEvent.click(btn);
    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextBtn.disabled).toBeTruthy();
  });
});
