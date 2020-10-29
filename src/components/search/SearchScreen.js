import React, { useMemo } from 'react';
import queryString from 'query-string'
import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';


export const SearchScreen = ({ history }) => {

    const location = useLocation();

    const { q = '' } = queryString.parse(location.search);

    const [formValues, handleInputChange] = useForm({
        searchText: q
    });

    const { searchText } = formValues;
    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${searchText}`);
    }


    return (
        <div>
            <h1>Search Screen</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr />

                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={searchText}
                            onChange={handleInputChange}
                        />

                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search
                        </button>
                    </form>

                </div>

                <div className="col-7">

                    <h4> Results </h4>
                    <hr />

                    {
                        (q === '')
                        &&
                        <div class="alert alert-info" role="alert">
                            <strong>Search a Hero</strong>
                        </div>
                    }

                    {
                        (q !== '' && heroesFiltered.length === 0)
                        &&
                        <div class="alert alert-info" role="alert">
                            <strong>We can´t find a Hero with: {q} . Please, try again.</strong>
                        </div>
                    }


                    {
                        heroesFiltered.map(hero => (
                            <HeroCard
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }


                </div>
            </div>

        </div>
    )
}
