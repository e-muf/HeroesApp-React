import React from 'react';
import '@testing-library/jest-dom';
import { mount } from "enzyme";
import { HeroScreen } from '../../../components/heroes/HeroScreen';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Pruebas en <HeroScreen />', () => {

    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    }

    test('debe de mostrar el componente Redirect si no hay argumentos en el URL', () => {
        const wrapper = mount( 
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={ history } /> 
            </MemoryRouter>
        );

        expect( wrapper.find('Redirect').exists() ).toBe( true );
    });

    test('debe mostrar un hero si e parámetro existe y se encuentra', () => {
        const wrapper = mount( 
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroeId" component={ HeroScreen } />
            </MemoryRouter>
        );

        expect( wrapper.find('.row').exists() ).toBe( true );
    });
    
    test('debe de regresar a la pantalla anterior con push', () => {

        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount( 
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={ () => <HeroScreen  history={ history } /> } 
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( history.push ).toHaveBeenCalledWith('/');
        expect( history.goBack ).not.toHaveBeenCalled();
    });
    
    test('debe de regresar a la pantalla anterior con goBack', () => {

        const history = {
            length: 3,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount( 
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={ () => <HeroScreen  history={ history } /> } 
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( history.goBack ).toHaveBeenCalled();
        expect( history.push ).toHaveBeenCalledTimes(0);
    });
    
    test('debe de llamar el Redirect si el hero no existe', () => {
        const wrapper = mount( 
            <MemoryRouter initialEntries={['/hero/marvel-spider123']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={ () => <HeroScreen  history={ history } /> } 
                />
            </MemoryRouter>
        );

        expect( wrapper.text() ).toBe('');
    })
    
});
