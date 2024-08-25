import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import InBox from '../Componets/Sceens/InBox';
import store from '../Store/index.js';

describe('InBox component', () => {
    test('check blue dot', () => {
        // Arrange
        render(
            <Provider store={store}>
                <InBox />
            </Provider>
        );

        const headerElement = screen.getByRole('banner'); // Find the header element by its role
        expect(headerElement).toBeInTheDocument();
    });

    test('check sideNav component', () => {
        // Arrange
        render(
            <Provider store={store}>
                <InBox />
            </Provider>
        );
        const sideNav = screen.getByTestId('sidenavtest');
        expect(sideNav).toBeInTheDocument();
    });
    
    test('check blue dot', () => {
        // Arrange
        render(
            <Provider store={store}>
                <InBox />
            </Provider>
        );
        const blueDot = screen.queryByTestId('blueDot');
        expect(blueDot).not.toBeInTheDocument();
    });
});
