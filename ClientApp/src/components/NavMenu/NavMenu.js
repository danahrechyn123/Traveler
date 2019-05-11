import React from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css';

class NavMenu extends React.Component {
    render() {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser) {
            if (currentUser.role === 0) {
                return (
                    <div id="NavMenu" className="d-flex flex-column flex-md-row align-items-center container-fluid bg-white border-bottom ">
                        <h2 className=" mr-md-auto"><Link to={'/'} exact className="btn btn-outline-primary">Home</Link></h2>

                        <h2><Link className="btn btn-outline-primary" to={'/mustvisit'}>Recommended</Link></h2>
                        <h2><Link className="btn btn-outline-primary" to={'/createtravel'}>Create</Link></h2>
                        <h2><Link className="btn btn-outline-primary" to={'/personalpage'}>{currentUser.firstName} {currentUser.lastName}</Link></h2>

                        <h2><Link className="btn btn-outline-primary" to={'/login'} exact>Logout</Link></h2>
                    </div>
                );
            }
            else {
                return (
                    <div id="NavMenu" className="d-flex flex-column flex-md-row align-items-center container-fluid bg-white border-bottom ">
                        <h2 className=" mr-md-auto"><Link to={'/'} exact className="btn btn-outline-primary">Home</Link></h2>

                        <h2><Link className="btn btn-outline-primary" to={'/travellist'}>Users</Link></h2>
                        <h2><Link className="btn btn-outline-primary" to={'/mustvisit'}>Places</Link></h2>
                        <h2 className="btn btn-outline-primary">Hello, admin</h2>

                        <h2><Link className="btn btn-outline-primary" to={'/login'} exact>Logout</Link></h2>
                    </div>
                );
            }
        }
        else {
            return (
                <div id="NavMenu" className="d-flex flex-column flex-md-row align-items-center container-fluid bg-white border-bottom ">
                    <h2 className=" mr-md-auto"><Link to={'/'} exact className="btn btn-outline-primary">Home</Link></h2>
                    
                    <h2><Link className="btn btn-outline-primary" to={'/register'}>Register</Link></h2>
                   
                    <h2><Link className="btn btn-outline-primary" to={'/login'} exact>Login</Link></h2>
                </div>
            );
        }
        
       
  }

}

export { NavMenu };