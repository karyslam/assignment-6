import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useLocation } from "wouter";
import * as Yup from "yup";
import { useFlashMessage } from "../stores/FlashMessageStore";

function RegisterPage() {
  const initialValues = {
    name: "",
    email: "",
    confirmPassword: "",
  };

  const { showMessage } = useFlashMessage();
  const [, setLocation] = useLocation();

  const handleSubmit = async (values, formikHelpers) => {
    console.log("hello")
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/register`,
        values
      );
      console.log("Registration successful:", response.data);
      showMessage("Registration successful!", "success");
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
      showMessage("Registration failed. Please try again.", "error");
    } finally {
      formikHelpers.setSubmitting(false);
      setLocation("/");
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-5">
      <h1>Register</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <Field
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                id="name"
                name="name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Field
                type="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                id="email"
                name="email"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Field
                type="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                id="password"
                name="password"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <Field
                type="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                id="confirmPassword"
                name="confirmPassword"
              />
            </div>

            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={formik.isSubmitting}
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterPage;
