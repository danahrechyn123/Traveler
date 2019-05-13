import React from 'react';
import { ListGroupItem, ButtonGroup, Button } from 'reactstrap';

class UserItem extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {

        return (           
            <ListGroupItem active tag="button" action>
                <div className="user-info">
                    <h2>{this.props.firstname} {this.props.lastname}</h2>
                </div>
                <ButtonGroup className="user-btn">
                    <Button>Delete</Button>
                    <Button>Add to admins</Button>
                    <Button>Block</Button>
                </ButtonGroup>
            </ListGroupItem>              
            
        );
    }
}

export default UserItem;
