
import React from 'react';
import {useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import Part from './shared/Part'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useLocation } from "react-router-dom";
import { HashRouter as Router, Link, Route, Switch } from "react-router-dom";
import Home from './Home/Home';
import Articles from './Articles/Articles'
import NewArticle from './NewArticle/NewArticle'
import Characters from './Characters/Characters'
import Places from './Places/Places'
import SingleArticle from './Articles/SingleArticle'
import {faFacebook} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  const PartText = (
    <div style={{
        paddingTop: '10%',
      
    }}>
        Znajdź nas na Facebooku i podziel się uwagami<br />
        <div className='text-center'>
            <span className='badge badge-light btn-block my-2'>
                <a href="https://www.facebook.com/"
                    className="facebook social my-auto">
                    <FontAwesomeIcon href="https://www.facebook.com/" icon={faFacebook} size='3x' />
                </a>

            </span>
            </div>
        <br />
        Są pewne mury, których nie należy budować. Są pewne granice, których nie powinno się przekraczać. Zapalić świecę znaczy rzucić cień, niebezpiecznie jest zmienić choć ułamek świata nie wiedząc jakie dobro i zło wywoła ten czyn. W świecie Ziemiomorza, każdy ma dwa imiona, jedno użytkowe, drugie prawdziwe. Znać czyjeś prawdziwe imię znaczy mieć nad nim wielką władzę, zdradzenie go jest oznaką miłości i zaufania. Ged, późniejszy Arcymag Ziemiomorza znany jako Krogulec, pierwsze kroki na drodze, którą kroczył całe życie - na drodze magii, stawiał wzywając sokoły ich prawdziwym imieniem, na które musiały się zjawić. Na początku zdawała się ona szerokim, jasnym gościńcem. Zdawało się, że mag to ktoś, kto potrafi uczynić wszystko. A prawda jest taka, że im bardziej rośnie prawdziwa moc człowieka i poszerza się jego wiedza, tym bardziej zwęża się droga, którą może kroczyć; aż wreszcie niczego już nie wybiera, lecz czyni tylko i wyłącznie to, co musi czynić...
        <br /> <br />

        &copy; 2020 <a rel='noopener noreferrer' target='_blank' className='footer-link' href='https://www.rafsaf.pl/'>rafsaf.pl</a>
    </div>
    
  
  )
  return (<footer className='mt-5'>
    
        <Part height='300px' font='normal' background='#002a32' left={PartText} lg={5} />

            </footer>
  );
}


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


export default function App() {
  return (
    <div className='app'>
      <Router hashType='noslash'>
      <ScrollToTop />

      <Navbar fixed='top' id='main-nav' collapseOnSelect expand="lg" className='nav-bg' variant="dark" >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto">
            
            <Nav.Link className='nav-link' as={Link} to="/home">ZIEMIOMORZE</Nav.Link>
            <Nav.Link className='nav-link' as={Link} to="/swiat">ŚWIAT PRZEDSTAWIONY</Nav.Link>
            <Nav.Link className='nav-link' as={Link} to="/artykuly">ARTYKUŁY</Nav.Link>
            <Nav.Link className='nav-link' as={Link} to="/wsparcie">WSPARCIE</Nav.Link>
            <Nav.Link className='nav-link' as={Link} to="/dodaj">DODAJ STRONĘ</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/swiat" component={Characters} />
      <Route path="/wsparcie" component={Places} />
      <Route path="/artykuly" component={Articles} />
      <Route path="/dodaj" component={NewArticle} />
      <Route path="/:topicName" component={SingleArticle} />

      </Switch>
      <footer><Footer /></footer>
      

      </Router>   
    </div>
  ) 
}

