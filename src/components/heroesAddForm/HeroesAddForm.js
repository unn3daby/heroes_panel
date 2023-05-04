import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { heroesAdd } from "../heroesList/heroesSlice";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";


// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {

    const [name, setName] = useState('');
    const [descr, setDescr] = useState('');
    const [element, setElement] = useState('');

    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters.filters);

    const onInputChange = (e, setter) => {
        setter(e.target.value);
    }
    const clearForm = () => {
        setName('');
        setDescr('');
        setElement('');
    }

    const formCreator = (name, descr, element) => {
        const formData = new FormData();
        formData.append("id", uuidv4());
        formData.append("name", name);
        formData.append("description", descr);
        formData.append("element", element);
        let obj = {}
        formData.forEach((value, key) => {
            obj[key] = value;
        })
        return obj;
    }

    const formSubmit = (e) => {
        e.preventDefault();
        const form = formCreator(name, descr, element)
        dispatch(heroesAdd(form));
        clearForm();
        axios.post('http://localhost:3001/heroes', form)
                .then(response => console.log(response))
                .catch(error => console.log(error));
    }
   

    return (
        <form onSubmit = {(e) => formSubmit(e)}className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    onChange={(e) => onInputChange(e, setName)} 
                    required
                    value = {name}
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    onChange={(e) => onInputChange(e, setDescr)}
                    required
                    value = {descr}
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    onChange={(e) => onInputChange(e, setElement)}
                    value = {element}
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option value = '' disabled>Я владею элементом...</option>
                    {filters.filter(item => item.value !== 'all').map((option, i) => <option key={i} value={option.value}>{option.name}</option>)}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;