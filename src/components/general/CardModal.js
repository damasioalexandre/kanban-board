import React, {Component, PropTypes} from 'react';
import {Modal, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class CardModal extends Component {
    constructor(props) {
        console.log('constructing');
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
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
    }

    handleOptionsChange(event) {
        let target = event.target;
        let options = target.options;
        let newCard = JSON.parse(JSON.stringify(this.state.card));
        let newOptions = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                newOptions.push(options[i].value);
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
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.card.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleCardUpdate}>
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
                            {/* laneId */}
                            <FormGroup controlId="laneId">
                                <ControlLabel>Lane</ControlLabel>
                                <FormControl
                                    componentClass="select"
                                    name="laneId"
                                    value={this.state.card.laneId}
                                    placeholder="Please select one"
                                    onChange={this.handleChange}>

                                    <option value="1">To Do</option>
                                    <option value="2">In Progress</option>
                                    <option value="2">Done</option>
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
                            <Button type="submit">Update</Button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.close}>Close</Button>
                    </Modal.Footer>
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
