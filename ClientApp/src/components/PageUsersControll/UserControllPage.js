import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { userService } from '../../services/UserService';
import UserItem from './UserItem';

class UserControllPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userList:''
        };
    }

    componentWillMount() {
        userService.getAll().then(res => {
            this.setState({
                userList: res
            });
        });
    }

  

    render() {
        
        return (
            <div className="UserControll container-fluid">
                <ListGroup>
                    {this.state.userList && this.state.userList.map((user) => (
                        <UserItem
                            firstname={user.firstname}
                            lastname={user.lastname}
                            username={user.username}
                            role={user.role}
                        />
                    ))}
                </ListGroup>
            </div>
        );
    }
}

export default UserControllPage;
