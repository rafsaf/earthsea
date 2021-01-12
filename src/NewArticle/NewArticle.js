import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import * as api from "../shared/api";
import BootstrapForm from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { defaultCategories } from "../Characters/Characters";
import { Link } from "react-router-dom";

const labels = {
  error: "Błąd połączenia",
  title: "Nazwa artykułu",
  slug: "Adres URL artykułu (slug)",
  author: "Autor",
  description: "Krótki opis artykułu",
  category: "Wybierz kategorię",
};

const NewArticleCreateSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Tekst nie może być krótszy niż 3 znaki.")
    .max(24, "Tekst nie może być dłuższy niż 24 znaków.")
    .matches(
      /^[\sAaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrQqSsŚśTtUuWwYyZzŹźŻż:();/.,!'"?!/]+$/,
      "Dozwolone tylko małe, duże litery, podstawowe znaki interpunkcyjne."
    )
    .required("To pole jest wymagane."),
  slug: Yup.string()
    .min(3, "Tekst nie może być krótszy niż 3 znaki.")
    .max(100, "Tekst nie może być dłuższy niż 100 znaków.")
    .matches(
      /^[a-z](-?[a-z])*$/,
      "Dozwolone tylko [a-z]-[a-z]-[...] itd. Na przykład „czarnoksieznik-z-archipelagu”."
    )
    .required("To pole jest wymagane."),
  author: Yup.string()
    .min(3, "Tekst nie może być krótszy niż 3 znaki.")
    .max(24, "Tekst nie może być dłuższy niż 24 znaków.")
    .matches(
      /^[\sAaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrQqSsŚśTtUuWwYyZzŹźŻż:();/.,!'"?!/]+$/,
      "Dozwolone tylko małe, duże litery, podstawowe znaki interpunkcyjne."
    )
    .required("To pole jest wymagane."),
  description: Yup.string()
    .min(50, "Tekst nie może być krótszy niż 50 znaków.")
    .max(160, "Tekst nie może być dłuższy niż 160 znaków.")
    .matches(
      /^[\sAaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrQqSsŚśTtUuWwYyZzŹźŻż:();/.,!'"?!/]+$/,
      "Dozwolone tylko małe, duże litery, podstawowe znaki interpunkcyjne."
    )
    .required("To pole jest wymagane."),
  category: Yup.string().max(100).required("To pole jest wymagane."),
});

export default function NewArticle() {
  const [errors, setErrors] = useState(null);
  const [successSlug, setSuccessSlug] = useState(null);
  const [disabled, setDisabled] = useState(false);

  return (
    <div id="new article" style={{ minHeight: "80vh" }}>
      <div className="container my-5 py-3">
        <h2 className="py-4">Utwórz nowy artykuł</h2>
        {errors
          ? Object.keys(errors).map((key) => (
              <Alert
                className="mt-3"
                show={true}
                key={key}
                variant="danger"
                dismissible
                onClose={() => {
                  let newErrors = { ...errors };
                  delete newErrors[key];
                  setErrors(newErrors);
                }}
              >
                <p>
                  <b>{labels[key]}</b>: {errors[key]}
                </p>
              </Alert>
            ))
          : null}
        {successSlug ? (
          <Alert
            className="mt-3"
            show={true}
            variant="success"
            dismissible
            onClose={() => {
              setSuccessSlug(null);
            }}
          >
            <p>
              <b>Artykuł pomyślnie utworzony!</b>
            </p>
            <Link to={"/" + successSlug}>
              Kliknij by przejść do artykułu
            </Link>
          </Alert>
        ) : null}
        <Formik
          initialValues={{
            title: "",
            slug: "",
            author: "",
            description: "",
            category: "Artykuły",
          }}
          validationSchema={NewArticleCreateSchema}
          onSubmit={(values, { resetForm }) => {
            setDisabled(true);
            const data = {
              title: values.title,
              slug: values.slug,
              author: values.author,
              description: values.description,
              category: values.category,
            };
            api
              .articleCreate(data)
              .then((response) => {
                setSuccessSlug(response.data.slug)
                resetForm({});
                setDisabled(false);
              })
              .catch((error) => {
                if (!error.response) {
                  setErrors({
                    error: "Nie udało się wysłać formularza, spróbuj ponownie.",
                  });
                } else {
                  setErrors(error.response.data);
                }
                setDisabled(false);
              });
          }}
        >
          {({ errors, touched }) => (
            <Form noValidate autoComplete="off">
              <BootstrapForm.Group controlId="validationCustom01">
                <BootstrapForm.Label>{labels.title}</BootstrapForm.Label>
                <Field
                  as={BootstrapForm.Control}
                  name="title"
                  isValid={touched.title && !errors.title}
                  isInvalid={touched.title && errors.title}
                />
                {errors.title && touched.title ? (
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.title}
                  </BootstrapForm.Control.Feedback>
                ) : null}
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="validationCustom02">
                <BootstrapForm.Label>{labels.slug}</BootstrapForm.Label>
                <Field
                  as={BootstrapForm.Control}
                  name="slug"
                  isValid={touched.slug && !errors.slug}
                  isInvalid={touched.slug && errors.slug}
                />
                {errors.slug && touched.slug ? (
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.slug}
                  </BootstrapForm.Control.Feedback>
                ) : null}
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="validationCustom03">
                <BootstrapForm.Label>{labels.author}</BootstrapForm.Label>
                <Field
                  as={BootstrapForm.Control}
                  name="author"
                  isValid={touched.author && !errors.author}
                  isInvalid={touched.author && errors.author}
                />
                {errors.author && touched.author ? (
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.author}
                  </BootstrapForm.Control.Feedback>
                ) : null}
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="validationCustom04">
                <BootstrapForm.Label>{labels.description}</BootstrapForm.Label>
                <Field
                  as={BootstrapForm.Control}
                  name="description"
                  isValid={touched.description && !errors.description}
                  isInvalid={touched.description && errors.description}
                />
                {errors.description && touched.description ? (
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.description}
                  </BootstrapForm.Control.Feedback>
                ) : null}
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="validationCustom05">
                <BootstrapForm.Label>{labels.category}</BootstrapForm.Label>
                <BootstrapForm.Control
                  as={Field}
                  component="select"
                  name="category"
                  isInvalid={touched.category && errors.category}
                >
                  {defaultCategories.map((row) => (
                    <option>{row.name}</option>
                  ))}
                </BootstrapForm.Control>
                {errors.category && touched.category ? (
                  <div>{errors.category}</div>
                ) : null}
              </BootstrapForm.Group>

              <button
                className="btn btn-primary my-2 mb-5"
                type="submit"
                disabled={disabled}
              >
                Utwórz
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
