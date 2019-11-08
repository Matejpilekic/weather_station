import React, { Component } from "react";
import '../css/Stationn.css';
import {Link} from 'react-router-dom';

export class SearchSuggest extends Component {
  
  constructor() {
    super();
    this.state = {
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ""
    };
  }

  onChange = e => {
    //const { suggestions } = this.props;
    const userInput = e.currentTarget.value;
    //console.log(this.props.weatherStations);
    const filteredSuggestions = this.props.weatherStations.filter(
      suggestion =>
        suggestion.placeName.toLowerCase().indexOf(userInput.toLowerCase()) > -1 || suggestion.meteoStationName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = (e) => {
    //console.log('asas'+e.currentTarget.dataset.div_id);
    //this.props.ChangeLocationStation(e.currentTarget.dataset.div_id);
    this.setState({
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };
  
  render() {
    
    let suggestionsListComponent;

    if (this.state.showSuggestions && this.state.userInput) {
      if (this.state.filteredSuggestions.length) {
        suggestionsListComponent = (
            
          
            <div id="myInputautocomplete-list" className="container autocomplete-items">
            {this.state.filteredSuggestions.map((suggestion, index) => {
                //<a href={`station/${suggestion._id}/`}>{suggestion.placeName}   <span className='station_name'>{suggestion.meteoStationName}</span></a>
              return (
                
                <div data-div_id={suggestion._id} key={suggestion._id} onClick={this.onClick}><strong>
                  <Link to={`/station/${suggestion._id}`} style={{"display":"block", "height" : "100%", "width" : "100%"}} >{suggestion.placeName}   <span className='station_name'>{suggestion.meteoStationName}</span></Link>
                </strong></div>
              );
            })}
          </div>
        );
      } else {
        suggestionsListComponent = (
          <div id="myInputautocomplete-list" className="container autocomplete-items">
            <div className='no_place'>There is no device in that place.</div>
          </div>
        );
      }
    }

    return (
      <React.Fragment>
        
        <div className="active-cyan-3 active-cyan-4 mb-4  myinput">
          <input className="form-control" type="text" id="myInput" name="myCountry" placeholder="Search"  autoComplete='off' onChange={this.onChange} value={this.state.userInput}/>
        </div>
        
    
        {suggestionsListComponent}
      </React.Fragment>
    );
  }
}

export default SearchSuggest;

