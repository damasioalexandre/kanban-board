import React, {Component, PropTypes} from 'react';
import {Modal, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class CardModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: true,
            card: this.props.card
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleOptionsChange = this.handleOptionsChange.bind(this);
        this.handleCardUpdate = this.handleCardUpdate.bind(this);
    }

    getValidationState() {
        const length = this.state.card.title.length;
        if (length > 10) return 'success';
        else if (length > 3) return 'warning';
        else if (length > 0) return 'error';
    }

    handleOptionsChange(event) {
        let target = event.target;
        let options = target.options;
        let newCard = this.state.card;
        let newOptions = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                newOptions.push(parseInt(options[i].value));
            }
        }
        newCard[target.name] = newOptions;
        this.setState({card: newCard});
    }

    handleChange(event) {
        let target = event.target;
        let newCard = JSON.parse(JSON.stringify(this.state.card));
        newCard[target.name] = target.value;
        this.setState({card: newCard});
    }

    handleCardUpdate(event) {
        event.preventDefault();
        this.props.updateCard(this.state.card);
    }

    render() {
        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.props.close}>
                    <form onSubmit={this.handleCardUpdate}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.state.card.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* Title */}
                            <FormGroup controlId="title"
                                       validationState={this.getValidationState()}>
                                <ControlLabel>Title</ControlLabel>
                                <FormControl
                                    type="text"
                                    name="title"
                                    value={this.state.card.title}
                                    placeholder="Enter title"
                                    onChange={this.handleChange}
                                />
                                <FormControl.Feedback />
                            </FormGroup>
                            {/* description */}
                            <FormGroup controlId="description"
                                       validationState={this.getValidationState()}>
                                <ControlLabel>Description</ControlLabel>
                                <FormControl
                                    type="text"
                                    name="description"
                                    value={this.state.card.description}
                                    placeholder="Enter description"
                                    onChange={this.handleChange}
                                />
                                <FormControl.Feedback />
                            </FormGroup>
                            {/* Estimate */}
                            <FormGroup controlId="estimate">
                                <ControlLabel>Estimate</ControlLabel>
                                <FormControl
                                    componentClass="select"
                                    name="estimate"
                                    value={this.state.card.estimate}
                                    placeholder="Please select one"
                                    onChange={this.handleChange}>

                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="5">5</option>
                                    <option value="8">8</option>
                                    <option value="13">13</option>
                                    <option value="20">20</option>
                                    <option value="40">40</option>
                                </FormControl>
                            </FormGroup>

                            {/* users */}
                            <FormGroup controlId="users">
                                <ControlLabel>Lane</ControlLabel>
                                <FormControl
                                    componentClass="select" multiple
                                    name="users"
                                    value={this.state.card.users}
                                    placeholder="Please select one"
                                    onChange={this.handleOptionsChange}>
                                    <option value="1">User 1</option>
                                    <option value="2">User 2</option>
                                    <option value="3">User 3</option>
                                </FormControl>
                            </FormGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" bsStyle="primary">Submit</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        )
    }
}

CardModal.PropTypes = {
    close: PropTypes.func.isRequired,
    card: PropTypes.array.isRequired,
    updateCard: PropTypes.func.isrequired
};

export default CardModal;
