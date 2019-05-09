import React from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import simpleParallax from 'simple-parallax-js';



class Places extends React.Component {
   
    render() {
        return (
            <div className="Places container-fluid">
                <div className = "AddPlaceBtn">
                    <h2><Link className="btn btn-outline-primary" to={'/createplace'}>Suggest place to visit</Link></h2>
                </div>
            </div>
        );
    }
}

export default Places;
