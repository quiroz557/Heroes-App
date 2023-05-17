import { authReducer } from '../../../src/auth'
import { types } from '../../../src/auth/types/types';

describe('Pruebas en authReducer', () => {  

    const initialState = { 
        logged: false,
    }

    test('Debe de retornar el estado por defecto', () => {
        const newState = authReducer(initialState, {});
        expect( newState ).toBe( initialState );
    })

    test('debe de (login) llamar el login, autenticar y establecer el user', () => {  

        const action = {
            type: types.login,
            payload: {
                id: '123',
                name: 'Pablo'
            }
        }

        const newState = authReducer(initialState, action);
        expect(newState).toEqual({
            logged: true,
            user: action.payload
        })
    })

    test('debe de (logout) borrar el name del usuario y logged en false', () => {  

        const action = {
            type: types.logout,
            user: {
                id: '123',
                name: 'Pablo'
            }
        }

        const newState = authReducer(initialState, action);
        expect(newState.logged).toBeFalsy();
        expect(newState.user).toBeUndefined();
    })
})