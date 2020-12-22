import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Req. 1.1: Render App test', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
});

describe('Req. 1.2: Link tests', () => {
  test('first link need to have Home', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homeLink = getAllByRole('link');
    expect(homeLink[0].textContent).toBe('Home');
  });

  test('second link need to have About', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homeLink = getAllByRole('link');
    expect(homeLink[1].textContent).toBe('About');
  });

  test('third link need to have Favorite Pokemon', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homeLink = getAllByRole('link');
    expect(homeLink[2].textContent).toBe('Favorite Pokémons');
  });
});

describe('Reg. 1.3: Check routers', () => {
  test('Need to route to "/" when click on Home Link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText('Home'));
    const path = history.location.pathname;
    expect(path).toBe('/');
  });

  test('Need to route to "/about" when click on About Link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText('About'));
    const path = history.location.pathname;
    expect(path).toBe('/about');
  });

  test('Need to route to "/favorites" when click on Favorite Pokémons Link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText('Favorite Pokémons'));
    const path = history.location.pathname;
    expect(path).toBe('/favorites');
  });

  test('Need to route to "/Not Found" when insert an invalid URL', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/xablau');
    const notfound = getByText('Page requested not found');
    expect(notfound).toBeInTheDocument();
  });
});
