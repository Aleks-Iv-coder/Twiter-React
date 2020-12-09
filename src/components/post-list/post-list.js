import React from 'react';

import PostListItem from '../post-list-item';

import './post-list.css';

const PostList = ({posts, onDelete, onToggleImoprtant, onToggleLiked}) => {

    const elements = posts.map((elem) => { // перебераем масив posts, элементы которого - это объекты c значениями label, importent, id, который нам передал главный модуль app и создаём элементы li по количеству элементов массива.
        const {id, important, ...itemProps} = elem // Расклыдываем объект elem на несколько переменных при помощи диструктуризации (вытаскиваем id, и создаём новый объект itemProps с ключами label и importent)
        const clazz = important ? 'list-group-item-importent' : ''
        return (
            <li key={id} className={`list-group-item ${clazz}`}>
                <PostListItem // в новом формате кода JS при помощи оператора спред (...) можно записать PostListItem {...itemProps}
                /*label = {itemProps.label}
                important = {itemProps.important}
                like = {itemProps.like} */
                {...itemProps}
                important = {important}
                onDelete = {() => onDelete(id)}
                onToggleLiked = {() => onToggleLiked(id)}
                onToggleImportant = {() => onToggleImoprtant(id)}/>
            </li>
        )
    })
    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default PostList;