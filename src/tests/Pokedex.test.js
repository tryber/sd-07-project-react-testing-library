test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
  
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });