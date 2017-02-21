import React, {Component, PropTypes} from 'react';

/*components*/
import Card from './Card';

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
        if (this.props.cards) {
            const cards = [];
            this.props.cards.map(function (card, index) {
                cards.push(this.renderCard(card, index));
            }.bind(this));
            return (
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
        return (
            <div>
                <button>Add a card</button>
            </div>
        )
    }
}

Lane.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    boardId: PropTypes.number.isRequired,
    cards: PropTypes.array
};

export default Lane;