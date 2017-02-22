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
        this.handleCardUpdate = this.handleCardUpdate.bind(this);
    }

    getValidationState() {
        const length = this.state.card.title.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
    }

    handleChange(event) {
        let target = event.target;
        let newCard = JSON.parse(JSON.stringify(this.state.card));
        newCard[target.name] = target.value;
        console.log('Before title set', this.state.card.title);
        this.setState({
            card: newCard
        });
        console.log('After title set', this.state.card.title);
    }

    handleCardUpdate(event){
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
