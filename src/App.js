
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { HashRouter as Router, Link, Route } from "react-router-dom";
import Home from './Home/Home';
import Articles from './Articles/Articles'
import NewArticle from './NewArticle/NewArticle'


function Footer() {

  return (
        <div className='justify-content-center' style={{
          backgroundColor: '#002a32',
          height: '100px',
          display: 'flex',
          color: '#00d6d6',
          alignItems: "flex-end",
          verticalAlign: 'middle',
          }}>
            <div>
              Created 2020 by <a rel='noopener noreferrer' target='_blank' className='footer-link' href='https://www.rafsaf.pl/'>rafsaf.pl</a>
            </div>
        </div>
  );
}



export default function App() {


  return (
    <div>
      <Router hashType='noslash'>


      <Navbar  collapseOnSelect expand="lg" className='nav-bg' variant="dark" style={{
              minHeight: '120px',
            }}>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <p className='nav-title'>Blog poświęcony uniwersum Ziemiomorza</p>
          <Nav className="mx-auto">
            
            <Nav.Link className='nav-link' as={Link} to="/home">EARTHSEA</Nav.Link>
            <Nav.Link className='nav-link' as={Link} to="/articles">ARTYKUŁY</Nav.Link>
            <Nav.Link as={Link} to="/new-article">DODAJ ARTYKUŁ</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/articles" component={Articles} />
      <Route path="/new-article" component={NewArticle} />
      <footer><Footer /></footer>
      

      </Router>   
    </div>
  ) 
}

