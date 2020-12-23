import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('sexto requisito', () => {
  test('se é renderizado um card com as informações de determinado pokémon', () => {
    const history = createMemoryHistory();
    const {
      getByText,
      queryByText,
      queryByTestId,
      getByAltText,
      getByTestId,
      getByRole,
    } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    // O nome correto do Pokémon deve ser mostrado na tela;
    expect(getByTestId('pokemon-name').tagName).toBe('P');
    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(queryByText('Pikachuu')).not.toBeInTheDocument();
    // O tipo correto do pokémon deve ser mostrado na tela.
    expect(getByTestId('pokemonType').tagName).toBe('P');
    expect(getByTestId('pokemonType')).toHaveTextContent('Electric');
    expect(queryByTestId('pokemonType')).not.toHaveTextContent('Fire');
    /* O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida. */
    expect(getByTestId('pokemon-weight').tagName).toBe('P');
    expect(getByTestId('pokemon-weight')).toHaveTextContent('Average weight: 6.0 kg');
    expect(queryByTestId('pokemon-weight')).not.toHaveTextContent('Average weight: 6 kg');
    /* A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon; */
    const imgSrc = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(getByRole('img').src).toBe(imgSrc);
    expect(getByAltText('Pikachu sprite')).toBeInTheDocument();
  });

  test('se o card contém um link de navegação para exibir detalhes', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const moreDetailsLink = getByText('More details');
    expect(moreDetailsLink.tagName).toBe('A');
  });

  test('se ao clicar no link, é feito redirecionamento para a página de detalhes', () => {
    const history = createMemoryHistory();
    const { getByText, queryAllByRole } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    expect(getByText('More details')).toBeInTheDocument();
    fireEvent.click(getByText('More details'));
    const allHeadings = queryAllByRole('heading');
    const QUATRO = 4;
    expect(allHeadings.length).toBe(QUATRO);
    expect(allHeadings[0]).toHaveTextContent('Pokédex');
    expect(allHeadings[1]).toHaveTextContent('Pikachu Details');
    expect(allHeadings[2]).toHaveTextContent('Summary');
    expect(allHeadings[3]).toHaveTextContent('Game Locations of Pikachu');
  });

  test('se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    expect(getByText('Pikachu')).toBeInTheDocument();
    fireEvent.click(getByText('Próximo pokémon'));
    expect(getByText('Charmander')).toBeInTheDocument();
    const moreDetailsLink = getByText('More details');
    expect(moreDetailsLink).toBeInTheDocument();
    fireEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/4');
  });

  test('se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const history = createMemoryHistory();
    const { getByText, getByLabelText, getByAltText, getAllByRole } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    expect(getByText('Pikachu')).toBeInTheDocument();
    fireEvent.click(getByText('Bug'));
    const caterpiePokemon = getByText('Caterpie');
    expect(caterpiePokemon).toBeInTheDocument();
    fireEvent.click(getByText('More details'));
    const labelInput = getByLabelText('Pokémon favoritado?');
    expect(labelInput).toBeInTheDocument();
    userEvent.click(labelInput);
    expect(labelInput).toBeChecked();
    // O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg;
    expect(getAllByRole('img')[1].src).toBe('http://localhost/star-icon.svg');
    // A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, onde <pokemon> é o nome do Pokémon exibido.
    expect(getByAltText('Caterpie is marked as favorite')).toBeInTheDocument();
  });
});
