import React from 'react';
import { cleanup } from '@testing-library/react';
import RenderWithRouter from './RenderWithRouter';
import App from '../App';
import About from '../components/About';

afterEach(cleanup);

describe('EX02 - Testando o arquivo About.js', () => {
  test('Teste se contém as informações sobre a Pokédex.', () => {
    const { history, getByText, container } = RenderWithRouter(<App />);

    history.push('/about');

    const describe = getByText(/This application simulates a Pokédex/i);
    const subTitle = getByText(/About Pokédex/i);
    const tagsP = container.getElementsByTagName('p');

    expect(describe).toBeInTheDocument();
    expect(subTitle).toBeInTheDocument();
    expect(tagsP.length).toBe(2);
  });

  test('Teste se aimgem contém a url de uma imagem', () => {
    const { getByAltText } = RenderWithRouter(<About />);

    const img = getByAltText(/Pokédex/i);
    // console.log(img);

    expect(img).toBeInTheDocument();
    expect(img.src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
