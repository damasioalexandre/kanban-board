import React, {Component, PropTypes} from 'react';
import {ItemTypes} from '../../constants/ItemTypes';
import {DragSource} from 'react-dnd';
// @TODO remove these imports
import Jquery from 'jquery';
import {apiUrl} from '../../constants/api';
//
import CardModal from '../../components/general/CardModal';

const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            removeCard: props.removeCard,
            card: props,
            addCard: props.addCard
        };
    },
    endDrag(props, monitor) {
        const source = monitor.getItem();
        const target = monitor.getDropResult();
        //@TODO fix null + undefined check
        if (source.id && target.lane.id) {
            let data = {
                "id": 555,
                "title": props.title,
                "description": props.description,
                "laneId": target.lane.id,
                "users": props.users
            };
            Jquery.ajax({
                url: apiUrl + "cards/" + source.id,
                type: "PATCH",
                data: data
            })
                .done(function (result) {
                    console.log("success 2");
                })
                .fail(function (status) {
                    console.log('error');
                });

            props.removeCard(props.id);
            target.lane.addCard(target.lane, source.card);
        }
    },
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {showModal: false};
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.updateCard = this.updateCard.bind(this);
    }

    close() {
        console.log('closing');
        this.setState({showModal: false});
    }

    open() {
        console.log('opening');
        this.setState({showModal: true});
    }

    updateCardProps(card) {

    }

    updateCard(updatedCard) {
        /*console.log('card before update: ', updatedCard);*/
        Jquery.ajax({
            url: apiUrl + "cards/" + this.props.id,
            type: "PUT",
            dataType: "json",
            data: updatedCard
        })
            .done(function (result) {
                this.setState({showModal: false});
                this.updateCardProps(result);
            }.bind(this))
            .fail(function (status) {
                console.log('error');
            });
    }

    render() {
        const {connectDragSource, isDragging} = this.props;
        return connectDragSource(
            <div>
                <div className="panel kanban-card">
                    <div className="panel-body" onClick={this.open}>
                        {this.props.title}
                    </div>
                </div>
                {this.state.showModal ?
                    <CardModal close={this.close} card={this.props} updateCard={this.updateCard}/> : null}
            </div>
        );
    }
}

Card.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    laneId: PropTypes.number,
    users: PropTypes.array,
    removeCard: PropTypes.func.isRequired,

    /*dnd props*/
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.CARD, cardSource, collect)(Card);