import React, { Component } from 'react'
import '../css/Stationn.css';
import '../css/css/weather-icons-wind.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Api from "../utils/Api";
import  SearchSuggest from './SearchSuggest';
import { BallBeat } from 'react-pure-loaders';
import {withRouter,Link} from 'react-router-dom';
import { buildStyles } from 'react-circular-progressbar';

function Unix_timestamp(t)
{
    var myDate = new Date( t );
    return myDate.toLocaleString();
}

class Stationn extends Component {

    constructor(){
        super();
        this.state={
          loading: true,
          error:null,
          weatherStations: [],
          stationData: []
        }
    }

    async componentDidMount() {

        // Load async data.
        try{
          this.setState({loading: true})
          var id=this.props.match.params.id;
          
          let stationData = await Api.get(`/meteostationdata?id=${id}`, {
            params: {
              results: 1
            }
          });

          let weatherStations = await Api.get(`/meteostations`);

          //console.log(statioasyncnData);
          this.setState({ 
            loading: false,
            weatherStations: weatherStations.data,
            stationData: stationData.data
          })
        }catch(e){
          //console.log(`😱 Axios request failed: ${e}`);
          // Error 😨
          if (!e.response) {
            // network error
            //console.log(e.message)
            this.setState({
              error: e.message
            })

          } else {
            // http status code
            const code = e.response.status
            this.setState({
              error: code+' '+e.response.statusText
            })
            // response statusText
            //console.log(e.response.statusText);
          }
        }
    }
    async componentWillReceiveProps(nextProps) {
        if(this.props.match.params.id !== nextProps.match.params.id) {
            // Load async data.
        try{
            this.setState({loading: true})
            var id=nextProps.match.params.id;
            
            let stationData = await Api.get(`/meteostationdata?id=${id}`, {
              params: {
                results: 1
              }
            });
            //console.log(statioasyncnData);
            this.setState({ 
              loading: false,
              stationData: stationData.data
            })
          }catch(e){
            //console.log(`😱 Axios request failed: ${e}`);
            // Error 😨
            if (!e.response) {
              // network error
              //console.log(e.message)
              this.setState({
                error: e.message
              })
  
            } else {
              // http status code
              const code = e.response.status
              this.setState({
                error: code+' '+e.response.statusText
              })
              // response statusText
              //console.log(e.response.statusText);
            }
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
        else{
            var stationData=this.state.stationData[0];
            var placeName = this.state.weatherStations.find( s => s._id === stationData.meteoStationId ).placeName;

            var windirection;
            var wind;
            switch(stationData.windDirection) {
                case 'N':
                    windirection='wi wi-wind towards-0-deg icon_size';
                    wind='North';
                    break;
                case 'NE':
                    windirection='wi wi-wind towards-23-deg icon_size';
                    wind='Northeast';
                    break;
                case 'E':
                    windirection='wi wi-wind towards-90-deg icon_size';
                    wind='East';
                    break;
                case 'SE':
                    windirection='wi wi-wind towards-113-deg icon_size';
                    wind='Southeast';
                    break;
                case 'S':
                    windirection='wi wi-wind towards-180-deg icon_size';
                    wind='South';
                    break;
                case 'SW':
                    windirection='wi wi-wind towards-203-deg icon_size';
                    wind='Southwest';
                    break;
                case 'W':
                    windirection='wi wi-wind towards-270-deg icon_size';
                    wind='West';
                    break;
                case 'WN':
                    windirection='wi wi-wind towards-293-deg icon_size';
                    wind='Northwest';
                    break;
                default:
                    windirection='wi wi-na icon_size';
                }

            return (
                <div>
                    <SearchSuggest weatherStations={this.state.weatherStations} />
                    <div className='container tenperature'>
                        <div className="icon_tenperature"><i className="wi wi-thermometer icon_size"></i></div>
                        <div className="data_temperature">{stationData.temperature}°C</div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            
                                <section className='wind col-sm frame'>
                                    <div className='title'>Wind</div>
                                    <div className='icon_and_data'>
                                        <div className='icon'>
                                            <div className="windmill">
                                            <div className="stick"></div>
                                            <div className="wrapper">
                                                <div className="rect red"></div>
                                                <div className="rect yellow"></div>
                                                <div className="rect green"></div>
                                                <div className="rect blue"></div>
                                                <div className="center"></div>
                                            </div>
                                            </div>
                                        </div>
                                            <div className='data'><span><i className={windirection}></i></span>{wind}</div>
                                            <div className='data'><span><i className="wi wi-strong-wind icon_size"></i></span>{stationData.windSpeed} km/h</div>
                                    </div>
                                </section>
                            
                            
                                <section className='humidity col-sm frame'>
                                    <div className='title'>Humidity</div>
                                    <div className='icon_and_data'>
                                        <div className='icon'>
                                            <CircularProgressbar value={stationData.humidity} text={`${stationData.humidity}%`} styles={buildStyles({
                                               textSize: '15px',
                                              // Colors
                                              pathColor: '#000a12',
                                              textColor: '#f3f3f3',
                                              trailColor: '#d6d6d6',
                                            })} />
                                        </div>
                                        <div className='data'><i className="wi wi-humidity icon_size"></i>{stationData.humidity} %</div>
                                    </div>
                                </section>
                            
                                <section className='pressure col-sm frame'>
                                    <div className='title'>Pressure</div>
                                    <div className='icon_and_data'>
                                        <div className='icon'>
                                            <CircularProgressbar value={stationData.pressure} minValue={800} maxValue={1200} text={`${stationData.pressure}hPa`} styles={buildStyles({
                                              textSize: '15px',
                                              // Colors
                                              pathColor: '#000a12',
                                              textColor: '#f3f3f3',
                                              trailColor: '#d6d6d6',
                                            })} />
                                        </div>
                                        <div className='data'><i className="wi wi-barometer icon_size"></i>{stationData.pressure} hPa</div>
                                    </div>
                                </section>
                            
                        </div>
                        <div className='time_and_location'>
                            <div><strong><i className="wi wi-time-2 time_icon"></i>{Unix_timestamp(stationData.timestamp)}</strong></div>
                            <div>{placeName}</div>
                            <center><Link to="/">Return to Home Page</Link></center>
                        </div>
                    </div>           
                </div>
            )
        }    
    }
}

export default withRouter(Stationn);