import { fireEvent, getByText, render, screen } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui/components/Navbar";

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('Pruebas en <Navbar />', () => {  

   
    test('Debe de mostrar el nombre del usuario', () => {  

        const contextValue = {
            logged: true,
            user: {
                id: 'ABC123',
                name: 'Pablito557'
            }
        }

        render(
            <MemoryRouter>
                <AuthContext.Provider value={ contextValue }>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( screen.getByText('Pablito557')).toBeTruthy();
    })

    test('debe de llamar el logout y navigate cuando se hace clic en logout', () => {  

        const mockLoggout = jest.fn();

        const contextValue = {
            logout: mockLoggout,
            user: {
                id: 'ABC123',
                name: 'Pablito557'
            }
        }

        render(
            <MemoryRouter>
                <AuthContext.Provider value={ contextValue }>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        
        const button = screen.getByRole('button', {name: 'Logout'});
        fireEvent.click(button);

        expect( mockLoggout ).toHaveBeenCalled();
        expect( mockedUsedNavigate ).toHaveBeenCalledWith('/login', { replace: true });
    })
})