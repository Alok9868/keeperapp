
import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from "./Login";
import Notescollections from "./Notescollection";
function App() {
    return ( 
  <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/Notescollection">
            <Notescollections />
          </Route>
        </Switch>
      </div>
    </Router>
  )

}

export default App;
