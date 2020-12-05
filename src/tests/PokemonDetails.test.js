import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste se informações detalhadas do Pokémon selecionado são mostradas', () => {
  it('texto deve conter page requested not found', () => {
    const poke = pokemons[0];
    const { getByText, history } = renderWithRouter(<App />);
    history.push(`/pokemons/${poke.id}`);
    const pokeNameDetails = getByText(`${poke.name} Details`);
    expect(pokeNameDetails).toBeInTheDocument();
  });
  it('Sem link de navegação para os detalhes do Pokémon selecionado.', () => {
    const poke = pokemons[0];
    const { queryByText, history } = renderWithRouter(<App />);
    history.push(`/pokemons/${poke.id}`);
    const pokeNav = queryByText('More details');
    expect(pokeNav).not.toBeInTheDocument();
  });
  it('Verifique se há um sumário', () => {
    const poke = pokemons[0];
    const { queryByText, history } = renderWithRouter(<App />);
    history.push(`/pokemons/${poke.id}`);
    const pokeNav = queryByText('Summary');
    expect(pokeNav).toBeInTheDocument();
  });
  it('Teste se existe na página uma seção com os mapas contendo as localizações', () => {
    const poke = pokemons[0];
    const { getAllByAltText, history } = renderWithRouter(<App />);
    history.push(`/pokemons/${poke.id}`);
    const imgs = getAllByAltText(`${poke.name} location`);
    const num = 2;
    expect(imgs.length).toBe(num);
  });
  it('Teste se o usuário pode favoritar um pokémon', () => {
    const poke = pokemons[0];
    const { getByLabelText, getByAltText, history } = renderWithRouter(<App />);
    history.push(`/pokemons/${poke.id}`);
    const pokeFav = getByLabelText('Pokémon favoritado?');
    expect(pokeFav).toBeInTheDocument();
    fireEvent.click(pokeFav);
    const fav = getByAltText(`${poke.name} is marked as favorite`);
    expect(fav).toBeInTheDocument();
  });
});
