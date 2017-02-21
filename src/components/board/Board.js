import React, {Component} from 'react';
import {apiUrl} from '../../constants/api';
import Jquery from 'jquery';

/*components*/
import Lane from './Lane';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {lanes: null};
    }

    componentWillMount() {
        Jquery.ajax({
            url: apiUrl + "lanes?_embed=cards",
            type: "GET",
            dataType: "json",
        })
            .done(function (result) {
                console.log("success");
                console.log(result);
                this.setState({lanes: result});
            }.bind(this))
            .fail(function (status) {
                console.log('error');
            })
    }

    renderLane(lane, key) {
        return (
            <div key={key}>
                <Lane id={lane.id} title={lane.title} boardId={lane.boardId} cards={lane.cards}/>
            </div>
        )
    }

    render() {
        if (this.state.lanes) {
            const lanes = [];
            this.state.lanes.map(function(lane, index){
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

export default Board;