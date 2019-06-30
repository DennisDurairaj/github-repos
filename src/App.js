import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './containers/Home';
import Repos from './components/Repos/Repos';

function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/:user" component={Repos} />
    </Router>
  );
}

export default App;
