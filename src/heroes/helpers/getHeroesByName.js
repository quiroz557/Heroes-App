import { heroes } from '../data/heroes'

export const getHeroesByName = ( name = '' ) => {
    name = name.toLocaleLowerCase().trim();

    if( name.length === 0 ) return [];
    
    const epa = heroes.filter(hero => hero.superhero.includes( name ))

    return heroes.filter(
        hero => hero.superhero.toLocaleLowerCase().trim().includes( name )
    );
}
