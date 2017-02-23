import React, {Component, PropTypes} from 'react';
import {ItemTypes} from '../../constants/ItemTypes';
import {DragSource} from 'react-dnd';
import Jquery from 'jquery';
import {apiUrl} from '../../constants/api';

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
                title: props.title,
                description: props.description,
                laneId: target.lane.id,
                users: props.users
            };
            Jquery.ajax({
                url: apiUrl + "cards/" + source.id,
                type: "PATCH",
                data: data
            })
                .done(function (result) {
                    props.removeCard(props.id);
                    target.lane.addCard(target.lane, source.card);
                })
                .fail(function (status) {
                    //@TODO Error handling
                });
        }
    },
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource()
    }
}

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            title: props.title,
            description: props.description,
            estimate: props.estimate,
            laneId: props.laneId,
            laneTitle: props.laneTitle,
            users: props.users
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.updateCard = this.updateCard.bind(this);
        this.updateCardState = this.updateCardState.bind(this);
    }

    close() {
        this.setState({showModal: false});
    }

    open() {
        this.setState({showModal: true});
    }

    updateCardState(card) {
        this.setState({
            showModal: false,
            title: card.title,
            description: card.description,
            estimate: card.estimate,
            laneId: card.laneId,
            laneTitle: card.laneTitle,
            users: card.users
        });
    }

    updateCard(updatedCard) {
        Jquery.ajax({
            url: apiUrl + "cards/" + this.props.id,
            type: "PUT",
            dataType: "json",
            data: updatedCard
        })
            .done(function (result) {
                this.setState({showModal: false});
                this.updateCardState(result);
            }.bind(this))
            .fail(function (result, status) {
               //@TODO Error logic
            });
    }

    render() {
        const {connectDragSource} = this.props;
        return connectDragSource(
            <div>
                <div className="panel kanban-card">
                    <div className="panel-body" onClick={this.open}>
                        {this.state.title}
                    </div>
                </div>
                {this.state.showModal ?
                    <CardModal close={this.close} card={this.state} updateCard={this.updateCard} isPost={false}/> : null}
            </div>
        );
    }
}

Card.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    estimate: PropTypes.number.isRequired,
    laneId: PropTypes.number,
    laneTitle: PropTypes.string.isRequired,
    users: PropTypes.array,
    removeCard: PropTypes.func.isRequired,

    /*dnd props*/
    connectDragSource: PropTypes.func.isRequired,
};

export default DragSource(ItemTypes.CARD, cardSource, collect)(Card);