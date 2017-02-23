import React, {Component} from 'react';
import {apiUrl} from '../../constants/api';
import Jquery from 'jquery';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

/*components*/
import Lane from './Lane';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {lanes: null};
        this.addCard = this.addCard.bind(this);
    }

    componentWillMount() {
        this.setAllData();
    }

    setAllData(callback) {
        Jquery.ajax({
            url: apiUrl + "lanes?_embed=cards",
            type: "GET",
            dataType: "json",
        })
            .done(function (result) {
                this.setState({lanes: null});
                this.setState({lanes: result});
            }.bind(this))
            .fail(function (status) {
                console.log('error');
            });
        if (callback) {
            console.log('calling back');
            callback()
        }
    }

    addCard(targetLane, card) {
        this.setAllData(function () {
            console.log('called back');
            let newLanes = Object.assign([], this.state.lanes);
            console.log(newLanes);
            newLanes.forEach(function (lane) {
                if (lane.id === targetLane.id) {
                    lane.cards.push(card);
                }
            });

            this.setState({lanes: newLanes});
        }.bind(this));
    }

    removeCard(cardId) {
        let cards = this.state.cards.filter(function (card) {
            return card.id !== cardId;
        });

        this.setState({cards: cards});
    }

    renderLane(lane, key) {
        return (
            <div key={key}>
                <Lane id={lane.id} title={lane.title} boardId={lane.boardId} cards={lane.cards}
                      addCard={this.addCard}/>
            </div>
        )
    }

    render() {
        console.log('rendering from board');

        if (this.state.lanes) {
            const lanes = [];
            this.state.lanes.map(function (lane, index) {
                lanes.push(this.renderLane(lane, index));
            }.bind(this));
            return (
                <div className="kanban-board">
                    <div className="row">
                        {lanes}
                    </div>
                </div>
            );
        }
        return <div>Loading...</div>
    }
}

export default DragDropContext(HTML5Backend)(Board);