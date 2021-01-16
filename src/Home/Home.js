import React, { useEffect, useState } from "react";
import MyCard from "../shared/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Error from "../shared/Error";
import * as api from "../shared/api";
import Image from "../img/cool2.png";

export default function Home() {

  const [articles, setArticles] = useState(null);
  const [latestArticles, setLatestArticles] = useState(null);
  const [articlesError, setArticlesError] = useState(null);

  const fetchArticles = () => {
    api
      .receiveHomeArticles()
      .then((response) => {
        setArticles(response.data);
      })
      .catch(() => {
        setArticlesError(true);
      });
  };

  const fetchLatestArticles = () => {
    api
      .receiveLatestArticles()
      .then((response) => {
        setLatestArticles(response.data);
        setArticlesError(false);
      })
      .catch(() => {
        setArticlesError(true);
      });
  };

  useEffect(() => {
    fetchArticles();
    fetchLatestArticles();
  }, []);

  return (
    <div id="home-page container-fluid">
      

      <Container
        fluid
        style={{
          backgroundImage: `url(${Image})`,
          minHeight: "80vh",
        }}
      >
        {articles && latestArticles && articlesError === false ? (
          <Row className=" mx-1 py-5 justify-content-center">
            <Col xs={12} xl={{ span: 10, offset: 0 }}>
              <Row className="py-2 justify-content-center">
                {latestArticles.map((row) => (
                  <MyCard
                    homeWidth
                    key={row.description}
                    title={row.title}
                    description={row.description}
                    image={row.image}
                    slug={row.slug}
                  ></MyCard>
                ))}
                {articles.map((row) => (
                  <MyCard
                    homeWidth
                    key={row.description}
                    title={row.title}
                    description={row.description}
                    image={row.image}
                    slug={row.slug}
                  ></MyCard>
                ))}
              </Row>
            </Col>
          </Row>
        ) : (
          <div className="text-center pt-4" style={{ height: "80vh" }}>
            <Error
              show={articlesError}
              onExit={() => {
                setArticlesError(null);
                fetchArticles();
                fetchLatestArticles();
              }}
            ></Error>
          </div>
        )}
      </Container>
    </div>
  );
}
