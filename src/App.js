import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './main.css';
import ItemDetailPage from './components/ItemDetailPage';
import CategoryPage from './components/CategoryPage';
import ContactPage from './components/ContactPage';

function App() {
  const [sarees, setSarees] = useState([]);
  const [lehengas, setLehengas] = useState([]);
  const [kurtis, setKurtis] = useState([]);

  useEffect(() => {
    fetch('/data/sarees.json')
      .then(response => response.json())
      .then(data => setSarees(data));

    fetch('/data/lehengas.json')
      .then(response => response.json())
      .then(data => setLehengas(data));

    fetch('/data/kurtis.json')
      .then(response => response.json())
      .then(data => setKurtis(data));
  }, []);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <header>
          E-Commerce Website - Indian Ethnic Clothes
        </header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/sarees">Sarees</Link>
          <Link to="/lehengas">Lehengas</Link>
          <Link to="/kurtis">Kurtis</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <main>
          <Switch>
            <Route path="/contact" component={ContactPage} />
            <Route path="/:category/:id" component={ItemDetailPage} />
            <Route path="/sarees">
              <CategoryPage category="sarees" />
            </Route>
            <Route path="/lehengas">
              <CategoryPage category="lehengas" />
            </Route>
            <Route path="/kurtis">
              <CategoryPage category="kurtis" />
            </Route>
            <Route path="/">
              <section id="sarees" className="category-section">
                <h2>Sarees</h2>
                <div className="category-container">
                  {sarees.map(item => (
                    <Link to={`/sarees/${item.id}`} className="category" key={item.id}>
                      <img src={item.img} alt={item.name} />
                      <h3>{item.name}</h3>
                    </Link>
                  ))}
                </div>
              </section>
              <section id="lehengas" className="category-section">
                <h2>Lehengas</h2>
                <div className="category-container">
                  {lehengas.map(item => (
                    <Link to={`/lehengas/${item.id}`} className="category" key={item.id}>
                      <img src={item.img} alt={item.name} />
                      <h3>{item.name}</h3>
                    </Link>
                  ))}
                </div>
              </section>
              <section id="kurtis" className="category-section">
                <h2>Kurtis</h2>
                <div className="category-container">
                  {kurtis.map(item => (
                    <Link to={`/kurtis/${item.id}`} className="category" key={item.id}>
                      <img src={item.img} alt={item.name} />
                      <h3>{item.name}</h3>
                    </Link>
                  ))}
                </div>
              </section>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;