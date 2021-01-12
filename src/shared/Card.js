import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "../img/cool.png";
import AsyncImage from "../shared/asyncImage";
import * as api from "../shared/api";

export default function MyCard(props) {
  const small = props.small ? "px-1 py-2 my-2 col-6 col-md-3 col-xl-2" : null;
  const fullWidth = props.fullWidth ? " my-2 col-6 col-lg-12 " : null;
  const homeWidth = props.homeWidth ? "px-1 py-2 my-2 col-6 col-lg-3" : null;
  let cardClass;
  let constHeight;
  if (small) {
    cardClass = small;
    constHeight = false;
  } else if (fullWidth) {
    cardClass = fullWidth;
    constHeight = false;
  } else if (homeWidth) {
    cardClass = homeWidth;
    constHeight = true;
  }

  return (
    <Card
      className={cardClass}
      style={{
        backgroundImage: `url(${Image})`,
      }}
    >
      <Card.Header
        style={{
          backgroundImage: `url(${Image})`,
          color: "black",
          height: "5rem",
        }}
      >
        <h1 className="title">{props.title}</h1>
      </Card.Header>
      <Card.Body style={{ paddingLeft: "0", paddingRight: "0" }}>
        {constHeight ? (
          <div className="text-center">
            {props.image ? (
              <AsyncImage className="cardImage rounded" src={api.API_IMG + props.image} />
            ) : null}
          </div>
        ) : (
          <div className="text-center">
            {props.image ? (
              <AsyncImage className="cardImage rounded" src={api.API_IMG + props.image} />
            ) : null}
          </div>
        )}

        <div style={{ paddingLeft: "1vh", paddingRight: "0" }}>
          <blockquote className="blockquote mt-2">
            <footer className="blockquote-footer" style={{ color: "revert" }}>
              {props.description}
            </footer>
          </blockquote>
          <FontAwesomeIcon color="#002a32" icon={faAngleDoubleRight} />{" "}
          <Card.Link className="read-more" as={Link} to={"/" + props.slug}>
            Czytaj dalej...
          </Card.Link>
        </div>
      </Card.Body>
    </Card>
  );
}
