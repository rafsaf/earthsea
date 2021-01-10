import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import BootstrapForm from "react-bootstrap/Form";
import {defaultCategories} from "../Characters/Characters";

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
    .required("To pole jest wymagane."),
  description: Yup.string()
    .min(50, "Tekst nie może być krótszy niż 50 znaki.")
    .max(160, "Tekst nie może być dłuższy niż 160 znaków.")
    .matches(
      /^[\sAaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrQqSsŚśTtUuWwYyZzŹźŻż:();/.,!'"?!/]+$/,
      "Dozwolone tylko małe, duże litery, podstawowe znaki interpunkcyjne."
    )
    .required("To pole jest wymagane."),
  category: Yup.string().required("To pole jest wymagane."),
});

const Basic = () => (
  <div className="container my-5 py-3">
    <h2 className="py-4">Utwórz nowy artykuł</h2>

    <Formik
      initialValues={{
        title: "",
        slug: "",
        author: "",
        description: "",
        category: "Artykuły",
      }}
      validationSchema={NewArticleCreateSchema}
      onSubmit={(values) => {
        // same shape as initial values
        alert(JSON.stringify(values));
      }}
    >
      {({ errors, touched }) => (
        <Form noValidate autoComplete="off">
          <BootstrapForm.Group controlId="validationCustom01">
            <BootstrapForm.Label>Nazwa artykułu</BootstrapForm.Label>
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
            <BootstrapForm.Label>Adres URL artykułu (slug)</BootstrapForm.Label>
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
            <BootstrapForm.Label>Autor</BootstrapForm.Label>
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
            <BootstrapForm.Label>Krótki opis artykułu</BootstrapForm.Label>
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
            <BootstrapForm.Label>Wybierz kategorię</BootstrapForm.Label>
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

          <button className="btn btn-primary my-2" type="submit">
            Utwórz
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default function NewArticle() {
  return (
    <div id="new article">
      <Basic />
    </div>
  );
}
