import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { AppRouter } from "../../src/router/AppRouter";

describe('Pruebas en <AppRouter />', () => {  
    test('Debe de mostrar el login si no está autenticado', () => {  

        const contextValue = {
            logged: false
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contextValue }>
                        <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        
        expect(screen.getByText('LoginPage')).toBeTruthy();
    })

    test('Debe de mostrar el componente de Marvel si está autenticado', () => {  
        const contextValue = {
            logged: true
        }

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={ contextValue }>
                        <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( screen.getByText('MarvelPage')).toBeTruthy();
    })
})