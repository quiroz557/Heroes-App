import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PublicRoute } from "../../src/router/PublicRoute"

describe('Pruebas en <PublicRoute />', () => {  
    test('Si no está autenticado debe mostrar el { children }', () => { 
        
        const constexValue = {
            logged: false
        }
        
        render(
            <AuthContext.Provider value={ constexValue }>
                <PublicRoute>
                    <h1>Ruta Pública</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );
        
        expect( screen.getByText('Ruta Pública')).toBeTruthy();
    });

    test('Debe de navegar si está autenticado', () => { 
        
        const constexValue = {
            logged: true,
            user: {
                name: 'Pablo',
                id: '123'
            }
        }
        
        render(
            <AuthContext.Provider value={ constexValue }>
                <MemoryRouter initialEntries={['/login']}>

                    <Routes>

                        <Route path='marvel' element={<h1>Página Marvel</h1>} />

                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Ruta Pública</h1>
                            </PublicRoute>
                        } />
                    
                    </Routes>

                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Página Marvel')).toBeTruthy();
    });
});