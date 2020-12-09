import React, { Component } from 'react';

import './post-status-filter.css';

export default class PoastSatusFilter extends Component {
    constructor (props) {
        super(props)
        this.buttons =  [
            {name: 'all', label: 'Все'},
            {name: 'star', label: <i className="fa fa-star"></i>},
            {name: 'like', label: <i className="fa fa-heart"></i>}
        ]
    }
    render () {
        const buttons = this.buttons.map(({name, label}) => {
            const {filter, onFilterSelect} = this.props;
            const active = filter === name; // сравниваем props.filter 
            const clazz = active ? 'btn-info' : 'btn-outline-secondary'
            return (
                <button 
                    key={name} 
                    type='button' 
                    className={`btn ${clazz}`}
                    // className={classNames}
                    onClick={() => onFilterSelect(name)}>{label}</button>
            )
    })

        return (
            <div className="btn-group">
                {buttons}
            </div>
        )
    }
}
