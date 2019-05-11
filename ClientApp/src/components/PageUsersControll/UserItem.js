import React from 'react';
import { ListGroupItem } from 'reactstrap';

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
                Cras justo odio
            </ListGroupItem>              
            
        );
    }
}

export default UserItem;
