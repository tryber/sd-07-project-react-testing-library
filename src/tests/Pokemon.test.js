
import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../components/renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';

const vip = {
    4: false,
    10: false,
    23: false,
    25: true,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
};

  describe('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    it('A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon', () => {
      const { getByTestId } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
      const pokemonName = getByTestId('pokemon-name');
      expect(pokemonName.textContent).toBe('Pikachu');
  });
    it('O tipo correto do pokémon deve ser mostrado na tela.', () => {
      const { getByTestId } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
      const pokemonType = getByTestId('pokemonType');
      expect(pokemonType.textContent).toBe('Electric');
  });
    it('testa o peso médio do pokémon', () => {
      const { getByTestId } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);   
      const pokeWeight = getByTestId('pokemon-weight');
      expect(pokeWeight.textContent).toBe('Average weight: 6.0 kg');
  });
    it(' imagem do Pokémon deve ser exibida', () => {
      const { getByAltText } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);  
      const img = getByAltText(`${ pokemons[0].name } sprite`);
      expect(img.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(img.alt).toBe('Pikachu sprite');
    });
    it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
      const { getByText } = renderWithRouter(<Pokemon Pokemon pokemon={ pokemons[0] } />);
      const link = getByText('More details');
      expect(link.tagName).toBe('A');
  });
    it('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento', () => {
      const { getByText } = renderWithRouter(<Pokemon Pokemon pokemon={ pokemons[0] } />);
      const link = getByText('More details');
      expect(link.href).toBe('http://localhost/pokemons/25');
  });
    it('Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
      const { getByText } = renderWithRouter(<App />);
      fireEvent.click(getByText(/More details/i));
      const subTitle = getByText(/Summary/i);
      expect(subTitle).toBeInTheDocument();
  });
    it('Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
      const { getByText ,history } = renderWithRouter(< App />);
      fireEvent.click(getByText(/More details/i));
      const { pathname } = history.location;
      expect(pathname).toBe('/pokemons/25');
  });
});
  describe('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    it('O ícone deve ser uma imagem com o atributo src', ()=>{
      const { getByAltText } = renderWithRouter( <Pokemon pokemon={ pokemons[0] } isFavorite={ vip[25] }/>);
      const image = getByAltText(`${pokemons[0].name} is marked as favorite`);
      expect(image.src).toBe('http://localhost/star-icon.svg');
      expect(image.alt).toBe('Pikachu is marked as favorite');
  });
    it('A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite', () => {
      const { getByAltText } = renderWithRouter( <Pokemon pokemon={ pokemons[0] } isFavorite={ vip[25] }/>);
      const image = getByAltText(`${pokemons[0].name} is marked as favorite`);
      expect(image.alt).toBe('Pikachu is marked as favorite');
  });
});
