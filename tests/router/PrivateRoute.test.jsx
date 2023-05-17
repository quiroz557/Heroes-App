import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";

describe('Pruebas en <PrivateRoute />', () => {  
    test('Si está autenticado debe mostrar el { children }', () => {

        Storage.prototype.setItem = jest.fn();
        
        const constexValue = {
            logged: true,
            user: {
                name: 'Pablo',
                id: 'ABC123'
            }
        }
        
        render(
            <AuthContext.Provider value={ constexValue }>
                <MemoryRouter initialEntries={['/marvel']}>
                    <PrivateRoute>
                        <h1>Ruta Privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        
        expect( screen.getByText('Ruta Privada')).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath','/marvel');
    });     
})