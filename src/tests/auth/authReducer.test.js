const { authReducer } = require("../../auth/authReducer");
const { types } = require("../../types/types");

describe('Pruebas en authReducer', () => {

    test('debe retonar el estado por defecto', () => {
        const state = authReducer({ logged: false }, {});
        expect( state ).toEqual( { logged: false } );
    });

    test('debe de autenticar y colocar el name del usuario', () => {

        const action = {
            type: types.login,
            payload: {
                name: 'Emanuel'
            }
        };

        const state = authReducer({ logged: false }, action);
        expect( state ).toEqual( { name: 'Emanuel', logged: true} )
    });

    test('debe de borrar el name del usuario y logged en false', () => {
        const state = authReducer({ logged: true, name: 'Pato' }, { type: types.logout });
        expect( state ).toEqual( { logged: false } );
    });
    
});
