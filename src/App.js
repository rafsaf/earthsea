import React from "react";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as api from "./shared/api";
import Part from "./shared/Part";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useLocation } from "react-router-dom";
import { HashRouter as Router, Link, Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import NewArticle from "./NewArticle/NewArticle";
import Characters from "./Characters/Characters";
import SingleArticle from "./Articles/SingleArticle";

const FooterLink = ({ url, text, small }) => (
  <a
    href={url}
    rel="noopener noreferrer"
    target="_blank"
    className={small ? "" : "footer-link"}
    style={small ? {fontSize: "x-small"} : {}}
  >
    {text}
  </a>
);

function Footer() {
  const PartText = (
    <div
      style={{
        paddingTop: "4%",
      }}
      className="col-12 col-md-9 col-lg-6 mx-auto"
    >
      <p className="contact-title">INFORMACJE</p>
      <p className="contact">
        Strona poświęcona twórczości{" "}
        <FooterLink
          url="https://www.ursulakleguin.com/biography"
          text="Ursuli Le Guin"
        />
        . Każda osoba może dodawać nowe artykuły lub edytować istniejące,
        wpisywane treści nie mogą być wulgarne lub naruszać prawa i zasad
        współżycia społecznego. Domyślnie pokazywane są jedynie artykuły i ich
        wersje zweryfikowane. Serwis nie korzysta z cookies, nie zbierane są
        żadne wrażliwe dane, przechowuje jedynie niewielką ilość niezbędnych do
        prawidłowego funkcjonowania strony danych w przeglądarce użytkownika,
        np. dane o polubionych artykułach w{" "}
        <FooterLink
          url="https://developer.mozilla.org/pl/docs/Web/API/Window/localStorage"
          text="Local Storage"
        />
        .
      </p>
      <p className="contact-title">KONTAKT</p>
      <p className="contact">rafal.safin12@gmail.com</p>
      <br />
      Są pewne mury, których nie należy budować. Są pewne granice, których nie
      powinno się przekraczać. Zapalić świecę znaczy rzucić cień, niebezpiecznie
      jest zmienić choć ułamek świata nie wiedząc jakie dobro i zło wywoła ten
      czyn. W świecie Ziemiomorza, każdy ma dwa imiona, jedno użytkowe, drugie
      prawdziwe. Znać czyjeś prawdziwe imię znaczy mieć nad nim wielką władzę,
      zdradzenie go jest oznaką miłości i zaufania. Ged, późniejszy Arcymag
      Ziemiomorza znany jako Krogulec, pierwsze kroki na drodze, którą kroczył
      całe życie - na drodze magii, stawiał wzywając sokoły ich prawdziwym
      imieniem, na które musiały się zjawić. Na początku zdawała się ona
      szerokim, jasnym gościńcem. Wydawało się, że mag to ktoś, kto potrafi
      uczynić wszystko. A prawda jest taka, że im bardziej rośnie prawdziwa moc
      człowieka i poszerza się jego wiedza, tym bardziej zwęża się droga, którą
      może kroczyć; aż wreszcie niczego już nie wybiera, lecz czyni tylko i
      wyłącznie to, co musi czynić...
      <br />
      <br />
      

      &copy; 2020 <FooterLink url="https://www.rafsaf.pl/" text="rafsaf.pl" />
      <br />
      <br />
      <FooterLink small="true" url={`${api.API_IMG}/admin/login/`} text="ADMIN PANEL" /> 
    </div>
  );
  return (
    <footer>
      <Part
        height="300px"
        font="normal"
        background="#002a32"
        left={PartText}
        lg={5}
      />
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
    <div className="app">
      <Router hashType="noslash">
        <ScrollToTop />

        <Navbar
          fixed="top"
          id="main-nav"
          collapseOnSelect
          expand="lg"
          className="nav-bg"
          variant="dark"
        >
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link className="nav-link" as={Link} to="/home">
                ZIEMIOMORZE
              </Nav.Link>
              <Nav.Link className="nav-link" as={Link} to="/articles">
                ARTYKUŁY
              </Nav.Link>
              <Nav.Link className="nav-link" as={Link} to="/add">
                DODAJ STRONĘ
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/articles" component={Characters} />
          <Route path="/add" component={NewArticle} />
          <Route path="/:topicName" component={SingleArticle} />
        </Switch>
        <footer>
          <Footer />
        </footer>
      </Router>
    </div>
  );
}
