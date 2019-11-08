import React, { PureComponent } from 'react';
import {Link} from 'react-router-dom';
import PageNotFound from '../pictures/error-404.png';

class NoMatch extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div>
                <img src={PageNotFound} alt='slika' style={{ display: 'block', margin: '80px auto', position: 'relative', width: '300px',height: '300px' }} />
                <center><Link to="/">Return to Home Page</Link></center>
            </div>
        )
    }
}

export default NoMatch
