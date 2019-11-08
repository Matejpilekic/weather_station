import React, { Component } from 'react'
import SearchSuggest from './SearchSuggest';
import Api from "../utils/Api";
import { BallBeat } from 'react-pure-loaders';
import Maps from './Maps';
import {withRouter,Link} from 'react-router-dom';


class Home extends Component {

    constructor(){
        super();
        this.state={
          loading: true,
          error: null,
          weatherStations: []
        }
    }

    async componentDidMount() {

        // Load async data.
        try{
          this.setState({loading: true});
          let weatherStations = await Api.get(`/meteostations`);
    
          //console.log(statioasyncnData);
          this.setState({ 
            loading: false,
            weatherStations: weatherStations.data,
          })
        }catch(e){

          if (!e.response) {
            // network error
            console.log(e.message)
            this.setState({
              error: e.message
            })

          } else {
            // http status code
            const code = e.response.status
            this.setState({
              error: code+' '+e.response.statusText
            })
          }
        }
    }

    render() {
        if(this.state.error){
          return(
            <div className='container-fluid home'>  
              <center>{this.state.error}</center>
              <center><Link to="/">Return to Home Page</Link></center>
            </div>
          )
        }
        else if(this.state.loading){
            return(
              <div className='container-fluid home'>
                <BallBeat /*color="#123abc"*/ color='#fdfdfd' loading />
              </div>
            )
        }
        else
        {
            return (
              <React.Fragment>
                <div className='container-fluid home'>
                    <div className='search_title'>Show me the weather in... city, or name</div>
                    <SearchSuggest weatherStations={this.state.weatherStations}/>
                    <div className="map">
                  <Maps stations={this.state.weatherStations}/>
                </div>
                </div>
                
              </React.Fragment>
            )
        }
        
    }
}

export default withRouter(Home);