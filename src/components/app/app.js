import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PoastSatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {label: 'Going to learn React', important: false, like: false, id: 1},
                {label: 'That is good', important: false, like: false, id: 2},
                {label: 'I need a break...', important: false, like: false, id: 3}
            ],
            term : '',
            filter : 'all'
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImoprtant = this.onToggleImoprtant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

        this.maxId = 4; // номер id с которого будут начинаться новые элементы для state.data Обычно id формируется на стороне сервера, но в этой примере мы сами его сгениррируем.
    }
    
    // удаляем пост
    deleteItem (id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id); // методом findIndex находим индекс елемента с нужным id в нашем массиве data. используем стрелочную функцию, перебереаем каждый элемент и сравниваем id полученый и тот который находится в элементе. Метод вернёт нам нужный индекс масива.
            // НА ПРЯМУЮ STATE МЕНЯТЬ НЕЛЬЗЯ!!! - используем обходной метод. При помощи slice, делаем срез масива data до нужного index - const before и после const after.
            const before = data.slice(0, index);
            const after = data.slice(index + 1);
            const newArr = [...before, ...after]; // объединяем два масива в один newArr

            return {
                data : newArr // возвращаем в state глвый масив, при этом само значение state не меняется, ключ остаётся тот же, а значение новое. 
            }
        });
    }

    // добавляем новый пост
    addItem (body) { // создаём новый элемент (объект данных), что б добавить его в наш state.data
        const newItem = [{
            label: body, // body - это то что будет вводиться в input в форме
            important: false,
            id: this.maxId++
        }]
        
        this.setState (({data}) => {
            const newArr = [...data, ...newItem]; // передаём в state наш массив с данными и добавляем новый элемент. Получаем новый масив и возвращаем его в data. Таким образом мы сохраняем state не изменным.
            return {
                data: newArr
            }
        })
    }
    
    // Отмечаем пост "важным"
    onToggleImoprtant (id) { 
        this.setState(({data}) => { // переключеам значение state data.important
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, important: !old.important};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]
            return {
                data: newArr
            }
        })
    }
    
    // Отмечаем пост "like"
    onToggleLiked (id) { // переключеам значение state data.liked
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, like: !old.like};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]
            return {
                data: newArr
            }
        })
    }

    // Поиск постов
    searchPost(items, term) {
        if(term.length === 0) {
            return items // если строка пустая, то возвращаем все посты которые есть.
        }

        return items.filter ((item) => { // перебираем все элементы items и возвращаем только те, котрые совпали по введённому term в поиске
            return item.label.indexOf(term) > -1
        });
    }

    filterPost (items, filter) {
        if (filter === 'like') {
            return items.filter((item) => {
                return item.like
            })
        } 
        if (filter === 'star') {
            return items.filter((item) => {
                return item.important
            })
        }
        else {
            return items
        }
    }

    // Обновляем значение строки поиска в state 
    onUpdateSearch (term) {
        this.setState({term});
    }

    onFilterSelect (filter) {
        this.setState({filter});
    }

    render () {
        const {data, term, filter} = this.state;
        const liked = data.filter(item => item.like).length; // считаем кол-во постов с like
        const allPosts = data.length; // считаем общее кол-во постов
        const visiblePosts = this.filterPost(this.searchPost(data, term), filter); // Создаём переменную, в которой будут посты которые мы ищем
        return (
            <div className="app">
                <AppHeader 
                    liked = {liked}
                    allPosts = {allPosts}/>
                <div className="search-panel d-flex">
                    <SearchPanel 
                        onUpdateSearch={this.onUpdateSearch}/> 
                    <PoastSatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList 
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImoprtant={this.onToggleImoprtant}
                    onToggleLiked={this.onToggleLiked}/> 
                <PostAddForm
                    onAdd={this.addItem}/>
            </div>
        )
    }
}