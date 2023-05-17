import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { SearchPage } from "../../../src/heroes/pages/SearchPage"

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('Pruebas en <SearchPage />', () => { 

    beforeEach(() => jest.clearAllMocks());

    test('Debe de mostrarse correctamente con valores por defecto', () => { 
        
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        expect( container ).toMatchSnapshot();

    });

    test('Debe de mostrar a Batman y el input con el valor del queryString', () => { 
        
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

       const input = screen.getByRole('textbox');
       expect( input.value ).toBe('batman');

       const img = screen.getByRole('img');
       expect( img.src ).toContain('/src/assets/heroes/dc-batman.jpg');

       const divSearch = screen.getByLabelText('div-search');
       expect( divSearch.style.display ).toBe('none');
        
    });

    test('Debe de mostrar un error si no se encuentra el hero', () => {  
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );

        const divError = screen.getByLabelText('div-error');
        expect( divError.style.display ).toBe('');
    })

    test('Debe de llamar el navigate a la pantalla nueva', () => { 
        
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 'batman'}})

        const form = screen.getByLabelText('form');
        fireEvent.submit(form);

        expect( mockedUsedNavigate ).toHaveBeenCalledWith('?q=batman');
    });
});