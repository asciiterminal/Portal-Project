import "./App.css";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Home from "./Home.jsx";

// This is the starting point. Since we only have one route, we only have component there. Home.

function App() {
  return (
    <Router>
    <Switch>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
    </Router>
  );
}

export default App;
