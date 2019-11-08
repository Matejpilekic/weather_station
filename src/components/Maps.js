import React, { PureComponent } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import {withRouter} from 'react-router-dom';

class Maps extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    setRedirect = (id) => {
        var redirectUrl="station/"+id;
        this.props.history.push(redirectUrl);
    }

    displayMarkers = () => {
        return this.props.stations.map((station, index) => {
          return <Marker key={index} id={index} position={{
           lat: station.meteoStationLocation.latitude,
           lng: station.meteoStationLocation.longitude
         }}
         onClick={() => this.setRedirect(station._id)} />
        })
    }

    render() {
        return (
            <React.Fragment>
                <Map
                    google={this.props.google}
                    zoom={8}
                    style={mapStyles}
                    initialCenter={{ lat: 43.9159, lng: 17.6791}}
                    >
                {this.displayMarkers()}
                </Map>

            </React.Fragment>
            
        )
    }
}
const mapStyles = {
    width: '90%',
    height: '500px',
    margin:'0 auto',
    position: 'relative',
  };

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCdaVj3kxko4Crk13Zm3Wn65OOjxno8xqc'
})(withRouter(Maps));

