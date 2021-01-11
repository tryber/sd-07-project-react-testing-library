import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
// a cada renderizaçao um novo historico é criado
  return ({
    ...render(<Router history={history}>{component}</Router>), history,
// a desconstução acima serve para possibilitar a captura dos objetos de histórico. 
  });
};

export default renderWithRouter;

// https://testing-library.com/docs/example-reach-router/
// Browser History preserva o historico de navegação em testes. Para resolver o problema, utilizamos o router customizado que apaga o histórcio entre cada testes. 