import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRoute from '../components/renderWithRoute';

describe('Testando o componente Pokedex', () => {
  it('Testando se é renderizado as informações do pokémon', () => {
    const { getByText, getByTestId, getByAltText } = renderWithRoute(<App />);
    const pikachuNome = getByText('Pikachu');
    expect(pikachuNome).toBeInTheDocument();
    const pikachuTipo = getByTestId('pokemonType');
    expect(pikachuTipo.innerHTML).toBe('Electric');
    const pikachuPeso = getByText('Average weight: 6.0 kg');
    expect(pikachuPeso).toBeInTheDocument();
    const pikachuImg = getByAltText('Pikachu sprite');
    expect(pikachuImg).toBeInTheDocument();

    fireEvent.click(getByText('Próximo pokémon'));
    const charmanderNome = getByText('Charmander');
    expect(charmanderNome).toBeInTheDocument();
    const charmanderTipo = getByTestId('pokemonType');
    expect(charmanderTipo.innerHTML).toBe('Fire');
    const charmanderPeso = getByText('Average weight: 8.5 kg');
    expect(charmanderPeso).toBeInTheDocument();
    const charmanderImg = getByAltText('Charmander sprite');
    expect(charmanderImg).toBeInTheDocument();
  });
  it('Testando se existe o botão More details nos cartões', () => {
    const { getByText, history } = renderWithRoute(<App />);
    const botaoDetalhesPikacho = getByText('More details');
    expect(botaoDetalhesPikacho).toBeInTheDocument();
    fireEvent.click(botaoDetalhesPikacho);
    expect(history.location.pathname).toBe('/pokemons/25');
    history.push('/');
    fireEvent.click(getByText('Próximo pokémon'));
    const botaoDetalhesCharmander = getByText('More details');
    expect(botaoDetalhesCharmander).toBeInTheDocument();
    fireEvent.click(botaoDetalhesCharmander);
    expect(history.location.pathname).toBe('/pokemons/4');
  });
  it('Testando o redirecionamento do botão More details', () => {
    const { getByText, history } = renderWithRoute(<App />);
    fireEvent.click(getByText('More details'));
    const textoDoPikachu = getByText('Game Locations of Pikachu');
    expect(textoDoPikachu).toBeInTheDocument();
    history.push('/pokemons/4');
    const textoDoCharmander = getByText('Game Locations of Charmander');
    expect(textoDoCharmander).toBeInTheDocument();
  });
  it('Testando se a URL exibida muda', () => {
    const { getByText, history } = renderWithRoute(<App />);
    fireEvent.click(getByText('More details'));
    expect(history.location.pathname).toBe('/pokemons/25');
    history.push('/pokemons/4');
    expect(history.location.pathname).toBe('/pokemons/4');
  });
  it('Testando se existe estrela de favorito no cartão', () => {
    const { getByText, getByAltText, history } = renderWithRoute(<App />);
    fireEvent.click(getByText('More details'));
    fireEvent.click(getByText('Pokémon favoritado?'));
    history.push('/');
    const estrela = getByAltText('Pikachu is marked as favorite');
    expect(estrela.src).toBe('http://localhost/star-icon.svg');
    expect(estrela).toBeInTheDocument();

    history.push('/pokemons/4');
    fireEvent.click(getByText('Pokémon favoritado?'));
    const novaEstrela = getByAltText('Charmander is marked as favorite');
    expect(novaEstrela.src).toBe('http://localhost/star-icon.svg');
    expect(novaEstrela).toBeInTheDocument();
  });
});
