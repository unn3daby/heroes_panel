import { createReducer } from "@reduxjs/toolkit"
import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroesAdd,
    heroesDelete,
    heroesFilter
} from '../actions/index'


const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    activeFilter: 'all',
}

const heroes = createReducer(initialState, builder => {
    builder
        .addCase(heroesFetching, state => {
            state.heroesLoadingStatus = 'loading';
        })
        .addCase(heroesFetched, (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        })
        .addCase(heroesFetchingError, (state) => {
            state.heroesLoadingStatus = 'error';
        })
        .addCase(heroesAdd, (state, action) => {
            state.heroes.push(action.payload);
        })
        .addCase(heroesDelete, (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        })
        .addCase(heroesFilter, (state, action) => {
            state.activeFilter = action.payload
        })
        .addDefaultCase(() => {console.log('action is not defined')});
})

 // eslint-disable-next-line
const heroes1 = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROES_DELETE':
            return {
                ...state,
                heroes: state.heroes.filter(item => item.id !== action.payload)
            }
        case 'HEROES_ADD': 
            return {
                ...state, 
                heroes: [...state.heroes, action.payload],
            }
        case 'HEROES_FILTER':
                return {
                    ...state,
                    activeFilter: action.payload,
                }
        default: return state
    }
}

export default heroes;