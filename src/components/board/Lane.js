import React, {Component, PropTypes} from 'react';
import Card from './Card';
import {ItemTypes} from '../../constants/ItemTypes';
import {DropTarget} from 'react-dnd';

const laneTarget = {
    drop(props) {
        return { id: props.id };
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
}

class Lane extends Component {
    renderCard(card, key) {
        return (
            <div key={key}>
                <Card id={card.id} title={card.title} description={card.description} laneId={card.laneId}
                      users={card.users}/>
            </div>
        )
    }

    render() {
        // If cards exist then render them
        if (this.props.cards) {
            const { connectDropTarget, isOver, children } = this.props;
            const cards = [];
            this.props.cards.map(function (card, index) {
                cards.push(this.renderCard(card, index));
            }.bind(this));
            return connectDropTarget(
                <div className="kanban-lane col-md-4 col-sm-4 col-xs-4">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">{this.props.title}</h4>
                        </div>
                        <div className="panel-body">
                            {cards}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

Lane.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    boardId: PropTypes.number.isRequired,
    cards: PropTypes.array,
    isOver: PropTypes.bool.isRequired,
};

export default DropTarget(ItemTypes.CARD, laneTarget, collect)(Lane);