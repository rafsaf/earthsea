
import React from 'react';
import {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import Part from './shared/Part'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { HashRouter as Router, Link, Route, Switch } from "react-router-dom";
import Home from './Home/Home';
import Articles from './Articles/Articles'
import NewArticle from './NewArticle/NewArticle'
import Characters from './Characters/Characters'
import Places from './Places/Places'
import SingleArticle from './Articles/SingleArticle'


function Footer() {
  const PartText = (
    <div style={{
        paddingTop: '10%'
    }}>
        Są pewne mury, których nie należy budować. Są pewne granice, których nie powinno się przekraczać. Zapalić świecę znaczy rzucić cień, niebezpiecznie jest zmienić choć ułamek świata nie wiedząc jakie dobro i zło wywoła ten czyn. W świecie Ziemiomorza, każdy ma dwa imiona, jedno użytkowe, drugie prawdziwe. Znać czyjeś prawdziwe imię znaczy mieć nad nim wielką władzę, zdradzenie go jest oznaką miłości i zaufania. Magia, smoki, władza... Ged, późniejszy Arcymag Ziemiomorza znany jako Krogulec, pierwsze kroki na drodze, którą kroczył całe życie - na drodze magii, stawiał wzywając sokoły ich prawdziwym imieniem, na które musiały się zjawić. Na początku zdawała się ona szerokim, jasnym gościńcem. Zdawało się, że mag to ktoś, kto potrafi uczynić wszystko. A prawda jest taka, że im bardziej rośnie prawdziwa moc człowieka i poszerza się jego wiedza, tym bardziej zwęża się droga, którą może kroczyć; aż wreszcie niczego już nie wybiera, lecz czyni tylko i wyłącznie to, co musi czynić...
        <br /> <br />
        &copy; 2020 <a rel='noopener noreferrer' target='_blank' className='footer-link' href='https://www.rafsaf.pl/'>rafsaf.pl</a>
    </div>
  
  )
  return (
        <Part height='300px' font='normal' background='#002a32' left={PartText} lg={5} />
  );
}


export default function App() {
  return (
    <div style={{marginTop: '50px'}}>
      <Router basename='/'>


      <Navbar fixed='top' id='main-nav' collapseOnSelect expand="lg" className='nav-bg' variant="dark" >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <p className='nav-title'>Blog poświęcony uniwersum Ziemiomorza</p>
          <Nav className="mx-auto">
            
            <Nav.Link className='nav-link' as={Link} to="/home">ZIEMIOMORZE</Nav.Link>
            <Nav.Link className='nav-link' as={Link} to="/postacie">POSTACIE</Nav.Link>
            <Nav.Link className='nav-link' as={Link} to="/miejsca">MIEJSCA</Nav.Link>
            <Nav.Link className='nav-link' as={Link} to="/artykuly">ARTYKUŁY</Nav.Link>
            <Nav.Link as={Link} to="/dodaj">DODAJ ARTYKUŁ</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/postacie" component={Characters} />
      <Route path="/miejsca" component={Places} />
      <Route path="/artykuly" component={Articles} />
      <Route path="/dodaj" component={NewArticle} />
      <Route path="/:topicName" component={SingleArticle} />

      </Switch>
      <footer><Footer /></footer>
      

      </Router>   
    </div>
  ) 
}

