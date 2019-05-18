import React from 'react';
import { connect } from 'react-redux';
import './Home.css';
import simpleParallax from 'simple-parallax-js';


class Home extends React.Component {
   
    render() {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        return (
            <div className="Home container-fluid">
                <div className="home-name">Traveller </div>
                <p className="home-text" >Plan your travel with us! </p>
            </div>
        );
    }
}

export default connect()(Home);
