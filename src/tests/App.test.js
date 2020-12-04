import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup, screen, waitForDomChange, fireEvent } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

describe('Testing the file App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Test if the Pokédex main page is rendered by loading the application in the URL / path', () => {
    render(
      <MemoryRouter>
      <App />
      </MemoryRouter>,
    );
    const title = screen.getByText(/Pokédex/i);
    expect(title).toBeInTheDocument();  
  });

  test('Test whether the top of the application contains a fixed set of navigation links', () => {
    render(
      <MemoryRouter>
      <App />
      </MemoryRouter>,
    );
    const home = screen.getByText(/Home/i);
    expect(home).toBeInTheDocument();
    const about = screen.getByText(/About/i);
    expect(about).toBeInTheDocument();
    const favorite = screen.getByText(/Favorite Pokémons/i);
    expect(favorite).toBeInTheDocument();  
  });

  test('Test if the application is redirected to the home page, by clicking on the Home link in the navigation bar', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
      <App />
      </Router>,
    );    
    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location
    expect(pathname).toBe('/');   
    
  });

  test('Test if the application is redirected to the about page, by clicking on the About link in the navigation bar', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
      <App />
      </Router>,
    );    
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location
    expect(pathname).toBe('/about');   
    
  });

  test('Test if the application is redirected to the favorites page, by clicking on the Favorite Pokémons link in the navigation bar', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
      <App />
      </Router>,
    );    
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location
    expect(pathname).toBe('/favorites');   
    
  });

  test('Test if the application is redirected to the Not Found page, entering an unknown URL', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
      <App />
      </Router>,
    );    
    const route = '/xablau';
    history.push(route)

    const pageNotFound = getByText(/Page requested not found/i);
    expect(pageNotFound).toBeInTheDocument();;   
    
  });
})