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
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Indian Ethnic Clothes</h1>
          <p className="hero-subtitle">Discover the beauty of traditional Indian attire</p>
        </div>
      </header>
      <nav className="navbar material-nav">
        <div className="nav-container">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/sarees" className="nav-link">Sarees</Link>
          <Link to="/lehengas" className="nav-link">Lehengas</Link>
          <Link to="/kurtis" className="nav-link">Kurtis</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <div className="nav-indicator"></div>
        </div>
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
                  {sarees.slice(0, 6).map(item => (
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
                  {lehengas.slice(0, 6).map(item => (
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
                  {kurtis.slice(0, 6).map(item => (
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