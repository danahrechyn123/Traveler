import React from 'react';
import { connect } from 'react-redux';
import './Home.css';
import simpleParallax from 'simple-parallax-js';


class Home extends React.Component {
   
    render() {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        return (
            <div className="Home container-fluid">
                <div className="">

                    <h2>Scroll to read more ... </h2>
                </div>

                <div className="AboutBox1"> about box</div>
            </div>
        );
    }
}

export default connect()(Home);
