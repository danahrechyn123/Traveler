import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

class UserControllPage extends React.Component {

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
            <div className="UserControll container-fluid">
                <ListGroup>
                    <ListGroupItem active tag="button" action>Cras justo odio</ListGroupItem>
                    <ListGroupItem tag="button" action>Dapibus ac facilisis in</ListGroupItem>
                    <ListGroupItem tag="button" action>Morbi leo risus</ListGroupItem>
                    <ListGroupItem tag="button" action>Porta ac consectetur ac</ListGroupItem>
                    <ListGroupItem disabled tag="button" action>Vestibulum at eros</ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}

export default UserControllPage;
