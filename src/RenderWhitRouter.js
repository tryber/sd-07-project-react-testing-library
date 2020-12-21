import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from "@testing-library/react"

const renderWhitRouter = (Component) => {
    const history = createMemoryHistory();
    return ({
        ...render(<Router history={history}>{Component}</Router>), history
    })
}
export default renderWhitRouter;