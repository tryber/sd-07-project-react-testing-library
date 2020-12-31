import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render (<MemoryRouter><App /></MemoryRouter>);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
});

describe('testa a funcionalidade dos menus e suas rotas', () => {
it('testa a url para home "/"', () => {
    const {getByText} = render (<MemoryRouter url={ ['/'] }><App/></MemoryRouter>,);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

it('testa o link para Home', () => {
    const {getByText} = renderWithRouter (<App/>);
    const linkHome = getByText('Home');
    expect(linkHome).toBeInTheDocument();
  });

it('testa o link para Sobre', () => {
    const {getByText} = renderWithRouter (<App/>);
    const linkHome = getByText('About');
    expect(linkHome).toBeInTheDocument();
  });

it('testa o link para Favorite Pokémons', () => {
    const {getByText} = renderWithRouter (<App/>);
    const linkHome = getByText('Favorite Pokémons');
    expect(linkHome).toBeInTheDocument();
  });

it('testa a rota para Home', () => {
    const {getByText, history} = renderWithRouter (<App/>);
    fireEvent.click(getByText(/Home/i));
    const {pathname} = history.location;
    expect(pathname).toBe('/');
  });

  it('testa a rota para About', () => {
  const {getByText, history} = renderWithRouter (<App/>);
    fireEvent.click(getByText(/About/i));
    const {pathname} = history.location;
    expect(pathname).toBe('/about');
  });

it('testa a rota para Favorite Pokémons', () => {
    const {getByText, history} = renderWithRouter (<App/>);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const {pathname} = history.location;
    expect(pathname).toBe('/favorites');
  });

it('testa a rota para do página não encontrada', () => {
    const {getByText, history} = renderWithRouter (<App/>);
    history.push('/pagina/que-nao-existe/');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
