import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

class CardForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleCardUpdate = this.handleCardUpdate.bind(this);
    }

    render() {
        return (
            <div>
                <FormGroup
                    controlId="title"
                    validationState={this.getValidationState()}
                >
                    <ControlLabel>Title</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.card.title}
                        placeholder="Enter text"
                        onChange={this.handleChange}
                        name="title"
                    />
                    <FormControl.Feedback />
                </FormGroup>
                <Button type="submit"> Update </Button >
            </div>
        )
    }
}

export default CardForm;