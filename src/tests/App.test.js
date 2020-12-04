import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/testRouterHelper';
import App from '../App';

describe('Teste da página inicial da pokedex', () => {
  
  it('deve testar se a página inicial da pokédex é renderizada no caminho `/`', () => {
    const { getByText} = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('deve testar se about encaminha para `/about`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    
    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();
    expect(about.href).toBe('http://localhost/about');
  });

  it('deve testar se Home encaminha para `/home`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    
    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();
    expect(home.href).toBe('http://localhost/');
  });

  it('deve testar se Favorite Pokémons encaminha para `/favorites`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    
    const favorites = getByText(/Favorite Pokémons/i);
    expect(favorites).toBeInTheDocument();
    expect(favorites.href).toBe('http://localhost/favorites');
  });

  it('deve testar se URLs invalidas direcionam para notfound', () => {
    const { getByText, history } = renderWithRouter(<App />)
    
    history.push('http://localhost/notfound')
    const notfound = getByText(/Page requested not found/i);
    expect(notfound).toBeInTheDocument();
  });

});

