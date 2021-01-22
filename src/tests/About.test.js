import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('Teste se a página contém o texto About Pokédex',
  () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

test('Teste se página possui elemento h2 com texto About Pokédex',
  () => {
    const { container } = render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <App />
      </MemoryRouter>,
    );
    const title = container.querySelector('h2');
    expect(title).toBeInTheDocument();
  });

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex',
  () => {
    const { container } = render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <App />
      </MemoryRouter>,
    );
    const paragraps = container.querySelectorAll('p');
    const expectNumberOfParagraps = 2;
    expect(paragraps.length).toBe(expectNumberOfParagraps);
  });

test('Teste se a página contém a seguinte imagem de uma Pokédex:',
  () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <App />
      </MemoryRouter>,
    );
    const image = getByRole('img');
    const imageUrl = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.src).toBe(imageUrl);
  });
