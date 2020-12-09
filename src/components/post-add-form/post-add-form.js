import React, {Component} from 'react';

import './post-add-form.css';

export default class PostAddForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            text: ''
        }

        this.onValumeChange = this.onValumeChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onValumeChange (e) {
        this.setState ({ // меняем state, добавляем значение inputa
            text: e.target.value
        })
    }

    onSubmit (e) {
        e.preventDefault();
        if (this.state.text.length === 0) {
            return
        } else {
            this.props.onAdd(this.state.text); // по нажатии кнопки создаём новый пост
            this.setState ({ // после создания поста, очищаем state
                text: ''
            })
        }
    }

    render () {
        return (
            <form 
                className="bottom-panel d-flex"
                onSubmit={this.onSubmit}>
                <input 
                    type="text"
                    placeholder="О чём вы думаете сейчас"
                    className="form-control new-post-label"
                    onChange={this.onValumeChange}
                    value={this.state.text}  // связываем state с значение input, получаем контролируемый компонент.
                />
                <button
                    type="submit"
                    className="btn btn-outline-secondary">
                Добавить</button>
            </form>
        )
    }
}
