import React, {Component} from 'react';
import Stationn from './components/Stationn';
import { HashRouter,Switch, Route } from "react-router-dom";
import Home from './components/Home';
import NoMatch from './components/NoMatch';

class App extends Component {


  render() {
        return(
        
            <HashRouter>
            
              <Switch>
            {/* If none of the previous routes render anything,
              this route acts as a fallback.
  
              Important: A route with path="/" will *always* match
              the URL because all URLs begin with a /. So that's
              why we put this one last of all */}
              <Route exact path="/" component={Home} />
              {/* Note how these two routes are ordered. The more specific
                path="/station/:id" comes before path="/station" so that
                route will render when viewing an individual station */}
              <Route path="/station/:id" component={Stationn} />
              
              <Route path='*' component={NoMatch} />
            </Switch>
          
          </HashRouter>
        );
  }
    
}

export default App;
