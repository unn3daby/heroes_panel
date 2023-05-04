import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filtersSlice';
import { configureStore } from '@reduxjs/toolkit';

/* const enhancer = (createStore) => (...args) => {
    const store = createStore(...args);

    const oldDispatch = store.dispatch;
    store.dispatch = (action) => {
        if(typeof(action) === 'string') {
            return oldDispatch({
                type: action
            });
        }
        return oldDispatch(action);
    }
    return store;
} */

const stringMiddleware = (store) => (next) => (action) => {
    if(typeof(action) === 'string') {
        return next({type: action});
    }
    let res = next(action);
    return res;
}


/* const store = createStore(
    combineReducers({heroes, filters}), 
    compose(applyMiddleware(stringMiddleware, thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())); */
const store = configureStore({
    reducer: {heroes, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})
console.log(store.getState())

export default store;