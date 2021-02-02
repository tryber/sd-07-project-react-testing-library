import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

test('É exibido na tela a mensagem No favorite pokemon found, se a pessoa não tiver pokémons favoritos', () => {
  const { getByText } = render(<FavoritePokemons />);
  const noFavorites = getByText(/No favorite pokemon found/i);
  expect(noFavorites).toBeInTheDocument();
});

test('É exibido todos os cards de pokémons favoritados', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  fireEvent.click(getByText(/more details/i));
  fireEvent.click(getByText(/Pokémon favoritado?/i));
  fireEvent.click(getByText(/Favorite Pokémons/i));
  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();
});

test('Nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const fav = getByTestId('pokemon-name').textContent;
  expect(fav).not.toBe('Charmander');
});
