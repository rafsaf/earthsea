import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Error from "../shared/Error";
import * as api from "../shared/api";
import MyCard from "../shared/Card";
import Part from "../shared/Part";
import RadioGroup from "../shared/radioGroup";
import CheckboxGroup from "../shared/checkboxGroup";
import Image from "../img/cool2.png";

export const defaultCategories = [
  { label: "Artykuły", name: "Artykuły", isChecked: true },
  { label: "Postacie", name: "Postacie", isChecked: true },
  { label: "Miejsca", name: "Miejsca", isChecked: true },
  { label: "Przedmioty", name: "Przedmioty", isChecked: true },
  { label: "Stworzenia", name: "Stworzenia", isChecked: true },
  { label: "Książki/Filmy", name: "Książki/Filmy", isChecked: true },
  { label: "Inne", name: "Inne", isChecked: true },
];
export const defaultAllCategories = [
  { label: "Wszystkie", name: "Wszystkie", isChecked: true },
];
export default function Characters() {
  const [categories, setCategories] = useState([...defaultCategories]);
  const [allCategories, setAllCategories] = useState(...defaultAllCategories);
  const [verifiedOnly, setVerifiedOnly] = useState(true);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState(null);

  const [articles, setArticles] = useState(null);
  const [articlesError, setArticlesError] = useState(null);

  const fetchArticles = () => {
    api
      .receiveAllArticles()
      .then((response) => {
        setArticles(response.data);
        setArticlesError(false);
      })
      .catch(() => {
        setArticlesError(true);
      });
  };

  const handleVerifiedOnlyChange = () => {
    setVerifiedOnly(!verifiedOnly);
  };

  const handleAllCategoryChange = (event) => {
    let newAllCategories = allCategories;
    newAllCategories.isChecked = event.target.checked;
    setAllCategories(newAllCategories);

    let newCategories = [...categories];
    newCategories.forEach((category) => {
      if (event.target.checked === true) {
        category.isChecked = event.target.checked;
      }
    });
    setCategories(newCategories);
  };

  const handleCategoryChange = (event) => {
    if (!event.target.checked) {
      let newAllCategories = allCategories;
      newAllCategories.isChecked = event.target.checked;
      setAllCategories(newAllCategories);
    }

    let newCategories = [...categories];
    newCategories.forEach((category) => {
      if (category.name === event.target.name) {
        category.isChecked = event.target.checked;
      }
    });
    setCategories(newCategories);
  };

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const filterRow = (row) => {
    if (filter === "description") {
      return row.description.toLowerCase().includes(search.toLowerCase());
    } else if (filter === "title") {
      return row.title.toLowerCase().includes(search.toLowerCase());
    } else {
      return (
        row.title.toLowerCase().includes(search.toLowerCase()) ||
        row.description.toLowerCase().includes(search.toLowerCase())
      );
    }
  };

  const searchSpace = (event) => {
    let keyword = event.target.value;
    setSearch(keyword);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    if (allCategories.label.length === 9 && articles) {
      let length = articles.length;
      let newAllCategories = allCategories;
      newAllCategories.label += `(${length})`;
      setAllCategories(newAllCategories);
    }
  }, [allCategories, articles]);

  useEffect(() => {
    if (categories[0].label.length === 8 && articles) {
      let newCategories = [...categories];
      newCategories.forEach((category) => {
        let length;
        length = articles.filter((article) => {
          if (article.category === category.name) {
            return true;
          }
          return false;
        }).length;

        category.label += `(${length})`;
      });
      setCategories(newCategories);
    }
  }, [categories, articles]);

  const PartOne = <div className="ursula">Świat przedstawiony</div>;

  return (
    <div id="characters">
      <Part Image size="larger" height="100px" right={PartOne} />
      <Container
        fluid
        style={{
          minHeight: "80vh",
          backgroundImage: `url(${Image})`,
        }}
      >
        {articles && articlesError === false ? (
          <Row className="justify-content-center py-3 pb-5">
            <Col xs="auto">
              <CheckboxGroup
                allCheck={allCategories}
                categories={categories}
                verifiedOnly={verifiedOnly}
                handleAllCategoryChange={handleAllCategoryChange}
                handleCategoryChange={handleCategoryChange}
                handleVerifiedOnlyChange={handleVerifiedOnlyChange}
              />
            </Col>
            <Col xs="auto" lg={10} className="border-world">
              <TextField
                onChange={(e) => searchSpace(e)}
                className="mx-1 mt-4 mb-2"
                style={{ width: "99%" }}
                id="standard-basic"
                label="Tutaj wpisz szukaną frazę..."
              />

              <RadioGroup
                className="mx-1"
                filter={filter}
                handleChange={handleChange}
              />
              <Row className="justify-content-start mx-1">
                {articles
                  .filter((row) => {
                    if (verifiedOnly) {
                      return row.confirmed;
                    } else {
                      return true;
                    }
                  })
                  .filter((row) => {
                    if (allCategories.isChecked) {
                      return row;
                    } else {
                      let length;
                      length = categories.filter((cat) => {
                        return cat.name === row.category && cat.isChecked;
                      }).length;

                      if (length === 1) {
                        return true;
                      }
                      return false;
                    }
                  })

                  .filter((row) => {
                    if (search == null) return row;
                    else if (filterRow(row)) {
                      return true;
                    }
                    return false;
                  })
                  .map((row) => (
                    <MyCard
                      small
                      key={row.description}
                      title={row.title}
                      description={row.description}
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
              }}
            ></Error>
          </div>
        )}
      </Container>
    </div>
  );
}
