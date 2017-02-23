import React, {Component, PropTypes} from 'react';
import Card from './Card';
import {ItemTypes} from '../../constants/ItemTypes';
import {DropTarget} from 'react-dnd';

const laneTarget = {
    drop(props) {
        return {lane: props};
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
    };
}

class Lane extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: props.cards
        };
        this.removeCard = this.removeCard.bind(this);
    }

    removeCard(cardId) {
        let cards = this.state.cards.filter(function (card) {
            return card.id !== cardId;
        });
        this.setState({cards: cards});
    }

    renderCard(card, key) {
        return (
            <div key={key}>
                <Card id={card.id} title={card.title} description={card.description} estimate={card.estimate}
                      laneId={card.laneId}
                      removeCard={this.removeCard}
                      users={card.users} laneTitle={this.props.title}/>
            </div>
        )
    }

    render() {
        // If cards exist then render them
        if (this.state.cards) {
            const {connectDropTarget} = this.props;
            const cards = [];
            this.state.cards.map(function (card, index) {
                cards.push(this.renderCard(card, index));
            }.bind(this));
            return connectDropTarget(
                <div className="kanban-lane col-md-3 col-sm-3 col-xs-3">
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
    addCard: PropTypes.func.isRequired
};

export default DropTarget(ItemTypes.CARD, laneTarget, collect)(Lane);