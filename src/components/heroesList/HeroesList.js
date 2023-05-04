import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { fetchHeroes } from '../heroesList/heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import { functions } from '../heroesList/heroesSlice';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE 

const HeroesList = () => {

    console.log(functions.selectAll());
    const filteredHeroesSelector = createSelector(
        functions.selectAll(),
        (state) => state.filters.activeFilter,
        (heroes, filter) => {
            if(filter === 'all') {
                return heroes;
            }
            else {
                console.log(filter, 'else');
                return heroes.filter(item => item.element === filter);
            }
        }
    );

    /* const filteredHeroes = useSelector(state => {
        if(state.filters.activeFilter === 'all') {
            return state.heroes.heroes;
        }
        else {
            return state.heroes.heroes.filter(item => item.element === state.filters.activeFilter);
        }
    });
    */
   
    const filteredHeroes = useSelector(filteredHeroesSelector);

    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchHeroes())
        // eslint-disable-next-line
    }, []);


    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        if(heroesLoadingStatus === 'loading') {
            return <Spinner/>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem id = {id} key={id} {...props}/>
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;