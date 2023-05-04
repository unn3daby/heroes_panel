import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filtersAdd } from "../heroesFilters/filtersSlice";
import { fetchFilters } from "../heroesFilters/filtersSlice";
import Spinner from "../spinner/Spinner";
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {filters, activeFilter, filtersLoadingStatus} = useSelector(state => state.filters)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchFilters());
        // eslint-disable-next-line
    }, []);
    
    const filtersRender = (filtersLoadingStatus) => {
        switch(filtersLoadingStatus) {
            case 'loading':
                return <Spinner/>
            case 'idle':
                return (<>
                    {filters.map(filter => <button 
                    onClick = {() => dispatch(filtersAdd(filter.value))} 
                    value = {filter.value} 
                    key = {filter.value} 
                    className={`btn ${filter.class} ${activeFilter === filter.value?'active':''}`}>
                        {filter.name}
                    </button>)}
                </>);
            case 'error':
                return <h2>Error!</h2>
            default:
                return null
        }
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filtersRender(filtersLoadingStatus)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;