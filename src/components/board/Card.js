import React, {Component, PropTypes} from 'react'
import {ItemTypes} from '../../constants/ItemTypes';
import {DragSource} from 'react-dnd';
// @TODO remove these imports
import Jquery from 'jquery';
import {apiUrl} from '../../constants/api';

const cardSource = {
    beginDrag(props) {
        return {
            id: props.id
        };
    },
    endDrag(props, monitor) {
        const source = monitor.getItem();
        const target = monitor.getDropResult();
        //@TODO fix null + undefined check
        if (source.id && target.id) {
            let data = {
                "id": 555,
                "title": props.title,
                "description": props.description,
                "laneId": target.id,
                "users": props.users
            };
            Jquery.ajax({
                url: apiUrl + "cards/" + source.id,
                type: "PATCH",
                data: data
            })
                .done(function (result) {
                    console.log("success 2");
                }.bind(this))
                .fail(function (status) {
                    console.log('error');
                })
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
    render() {
        const {connectDragSource, isDragging} = this.props;
        return connectDragSource(
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
    users: PropTypes.array,

    /*dnd props*/
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.CARD, cardSource, collect)(Card);