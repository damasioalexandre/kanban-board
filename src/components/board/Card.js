import React, {Component, PropTypes} from 'react'

class Card extends Component {
    render() {
        return (
            <div className="panel kanban-card">
                <div className="panel-body">
                    hello
                    {this.props.title}
                </div>
            </div>
        );
    }
}

Card.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    laneId: PropTypes.number,
    users: PropTypes.array
};

export default Card;