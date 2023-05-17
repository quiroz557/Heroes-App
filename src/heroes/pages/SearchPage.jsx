import React from 'react'
import { HeroCard } from '../components/HeroCard'
import { useForm } from '../../hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import { getHeroesByName } from '../helpers'

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse( location.search );
  const heroes = getHeroesByName(q);

  const showSearch = (q.length === 0);
  const showError = ( heroes.length === 0 && q.length > 0 );

  const { searchHero, onInputChange } = useForm({
    searchHero: q
  });

  const onSearchSubmit = ( event ) => {
    event.preventDefault();

    // if ( searchHero.trim().length <= 1 ) return;

    navigate(`?q=${ searchHero }`)
  }

  return (
    <>
       <h1>SearchPage</h1>

       <div className="row">

        <div className="col-5">
            <h4>Searching</h4>
            <hr />
            <form aria-label='form' onSubmit={ onSearchSubmit }>
              <input 
                type={'text'}
                placeholder={'Search a hero'}
                className='form-control'
                name='searchHero'
                autoComplete='off'
                onChange={onInputChange}
                value={searchHero}
              />

              <button className='btn btn-outline-primary mt-1'>
                Search
              </button>

            </form>
        </div>

        <div className="col-7">
            <h4>Results</h4>
            <hr />

            <div 
              className="alert alert-primary" 
              style={{display: showSearch ? '' : 'none'}}
              aria-label='div-search'
            >
              Search a hero
            </div>

            <div  
              aria-label='div-error'
              className="alert alert-danger" 
              style={{display: showError ? '' : 'none'}}
            >
              No hero with <b>{ q }</b>
            </div>

            {
              heroes.map( hero =>  (
                <HeroCard key={hero.id} {...hero} />
              ))
            }
            
        </div>

       </div>

    </>
  )
}
