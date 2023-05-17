import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../helpers'
import { HeroCard } from './HeroCard';

export const HeroList = ({ publisher }) => {
  
    const heroes = useMemo(() => getHeroesByPublisher( publisher ), [publisher]) 

    return (
        <ul className='row row-cols-1 row-cols-lg-3 row-cols-md-2 g-3'>
            { 
                heroes.map(hero => (
                    <HeroCard key={hero.id} {...hero} />
                )) 
            }
        </ul>
    )
}
