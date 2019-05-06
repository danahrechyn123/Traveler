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

                        <h2><Link className="btn btn-outline-primary" to={'/travellist'}>Travels</Link></h2>
                        <h2><Link className="btn btn-outline-primary" to={'/mustvisit'}>Must Visit</Link></h2>
                        <h2><Link className="btn btn-outline-primary" to={'/createtravel'}>Create</Link></h2>
                        <h2><Link className="btn btn-outline-primary" to={'/personalcabinet'}>{currentUser.firstName} {currentUser.lastName}</Link></h2>

                        <h2><Link className="btn btn-outline-primary" to={'/login'} exact>Logout</Link></h2>
                    </div>
                );
            }
            else {
                return (
                    <div id="NavMenu" className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                        <h5 className="my-0 mr-md-auto font-weight-normal"><Link to={'/'} exact>Home</Link></h5>
                        <nav className="my-2 my-md-0 mr-md-3">

                            <h2>Hello, Admin </h2>
                        </nav>
                        <Link className="btn btn-outline-primary" to={'/login'} exact>Logout</Link>
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