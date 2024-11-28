import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useLocation } from "wouter";
import * as Yup from "yup";
import { useFlashMessage } from "../stores/FlashMessageStore";
import { useJwt } from "../stores/UserStore";

export default function LoginPage() {
  const { setJwt } = useJwt();
  const [, setLocation] = useLocation();
  const { showMessage } = useFlashMessage();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/api/users/login",
        values
      );
      console.log("Login successful:", response.data);
      setJwt(response.data.token); // Store the JWT
      actions.setSubmitting(false);
      showMessage("Login successful!", "success");
      setLocation("/");
    } catch (error) {
      console.error("Login error:", error);
      actions.setErrors({ submit: error.response.data.message });
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {function (formik) {
          return (
            <Form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>

              {formik.errors.submit && (
                <div className="alert alert-danger">{formik.errors.submit}</div>
              )}

              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
