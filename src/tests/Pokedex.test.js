import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('', () => {});

// Teste se página contém um heading h2 com o texto Encountered pokémons.
test('if pokedex contains h2 with Encountered pokémons', () => {
  const { container } = renderWithRouter(<App />);
  const [h2] = container.getElementsByTagName('h2');
  expect(h2).toHaveTextContent('Encountered pokémons');
});
// Teste se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado.
test('if next pokemon is shown', () => {
  const { getByText } = renderWithRouter(<App />);
  // const pikachu = getByText(/pikachu/i);
  fireEvent.click(getByText(/próximo pokémon/i));
  const char = getByText(/charmander/i);
  // expect(pikachu).toBeInTheDocument();
  expect(char).toBeInTheDocument();
});
// O botão deve conter o texto Próximo pokémon; FAZER ESSE!!!
test('button contains text proximo pokemon', () => {
  const { getByText } = renderWithRouter(<App />);
  const button = getByText(/próximo pokémon/i);
  expect(button.innerHTML).toBe('Próximo pokémon');
});
// Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;

// O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;

// Teste se é mostrado apenas um Pokémon por vez.

// Teste se a Pokédex tem os botões de filtro.

// A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;

// O texto do botão deve corresponder ao nome do tipo, ex. Psychic;

// Teste se a Pokédex contém um botão para resetar o filtro

// O texto do botão deve ser All;

// A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado;

// Ao carregar a página, o filtro selecionado deverá ser All;

// Teste se é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon.

// Os botões de filtragem devem ser dinâmicos;

// Deve existir um botão de filtragem para cada tipo de Pokémon disponível nos dados, sem repetição. Ou seja, a sua Pokédex deve possuir pokémons do tipo Fire, Psychic, Electric e Normal;

// Deve ser mostrado como opção de filtro, um botão para cada um dos tipos. Além disso, o botão All precisa estar sempre visível.

// O botão de Próximo pokémon deve ser desabilitado quando a lista filtrada de Pokémons tiver um só pokémon.
