import React from 'react';
import '../Places.css';
import LeftSideComp from './LeftSideComp';
import PlaceFormComp from './PlaceFormComp';



class CreatePlace extends React.Component {
   
    render() {
        return (
            <div className="CreatePlace container-fluid">
                <div className="container">
                    <LeftSideComp />
                    <PlaceFormComp />
                </div>
            </div>

        );
    }
}

export default CreatePlace;
