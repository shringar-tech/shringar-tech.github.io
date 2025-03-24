import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';
import ItemDetailPage from './components/ItemDetailPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/category/:categoryName" component={CategoryPage} />
        <Route path="/item/:itemId" component={ItemDetailPage} />
      </Switch>
    </Router>
  );
}

export default App;