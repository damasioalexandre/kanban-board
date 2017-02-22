import React, {Component} from 'react';
import {Modal, Tooltip, Button, Popover} from 'react-bootstrap';

class CardModal extends Component {
    constructor(props) {
        console.log('constructing');
        super(props);
        this.state = {showModal: false};
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    close() {
        this.setState({showModal: false});
    }

    open() {
        this.setState({showModal: true});
    }

    render() {
        const popover = (
            <Popover id="modal-popover" title="popover">
                very popover. such engagement
            </Popover>
        );
        const tooltip = (
            <Tooltip id="modal-tooltip">
                wow.
            </Tooltip>
        );

        return (
            <div>
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.open}
                >
                    Launch demo modal
                </Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        test
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default CardModal;
