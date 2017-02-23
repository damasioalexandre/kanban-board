import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {apiUrl} from '../../constants/api';
import Jquery from 'jquery';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import CardModal from '../../components/general/CardModal';

/*components*/
import Lane from './Lane';

class Board extends Component {
    constructor(props) {
        super(props);
        let defaultCard = {
            title: "New Card",
            description: "",
            estimate: 0,
            laneId: 1,
            users: []
        };
        this.state = {
            lanes: null,
            showModal: false,
            defaultCard: defaultCard
        };

        this.createCard = this.createCard.bind(this);
        this.addCard = this.addCard.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    componentWillMount() {
        this.setAllData();
    }

    close() {
        this.setState({showModal: false});
    }

    open() {
        this.setState({showModal: true});
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
                //@TODO Error handling
            });
        if (callback) {
            callback()
        }
    }

    createCard(newCard) {
        Jquery.ajax({
            url: apiUrl + "cards",
            type: "POST",
            dataType: "json",
            data: newCard
        })
            .done(function (result) {
                this.setState({showModal: false});
                this.addCard(1, result);
            }.bind(this))
            .fail(function (result, status) {
                //@TODO Error logic
            });
    }

    addCard(targetLane, card) {
        this.setAllData(function () {
            let newLanes = Object.assign([], this.state.lanes);
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
        console.log(this.state.lanes);
        if (this.state.lanes) {
            const lanes = [];
            this.state.lanes.map(function (lane, index) {
                lanes.push(this.renderLane(lane, index));
            }.bind(this));
            return (
                <div className="kanban-board">
                    <Button onClick={this.open} bsStyle="success" className="addCardBtn"><span className="glyphicon glyphicon-plus"></span></Button>
                    <div className="row">
                        {lanes}
                    </div>
                    {this.state.showModal ?
                        <CardModal close={this.close} card={this.state.defaultCard} createCard={this.createCard}
                                   isPost={true}/> : null}
                </div>
            );
        }
        return <div>Loading...</div>
    }
}

export default DragDropContext(HTML5Backend)(Board);