import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {
    constructor (props) {
        super(props);
        this.state = {
            term: ''
        }

        this.onUpdateSearch = this.onUpdateSearch.bind(this);
    }

    onUpdateSearch (e) { 
        const term = e.target.value
        // console.log (term);
        this.setState({term});
        this.props.onUpdateSearch(term); // передаём значение state из search-panel через props в app 
    }
    
    render() {
        return (
            <input 
            className="form-control search-input"
            type="text"
            placeholder="Поиск по записям"
            onChange={this.onUpdateSearch}
            />
        )
    }
}
