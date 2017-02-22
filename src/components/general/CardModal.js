import React, {Component, PropTypes} from 'react';
import {Modal, Tooltip, Button, Popover} from 'react-bootstrap';

class CardModal extends Component {
    constructor(props) {
        console.log('constructing');
        super(props);
        this.state = {showModal: true};
    }

    render() {
        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.props.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        test
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
};

export default CardModal;
