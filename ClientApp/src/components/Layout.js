import React from 'react';
import { NavMenu } from './NavMenu/NavMenu';



export default props => (
    <div>
        <NavMenu />
        <div>
            <div role="main" className="main container-fluid">
                {props.children}
            </div>
        </div>
    </div>
);
