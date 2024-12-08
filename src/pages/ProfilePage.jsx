// import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";

function ProfilePage() {
  const navigate = useNavigate();

  const signUpHandler = async (formData) => {
    try {
      const response = await axios.post(
        "https://socialpedia-backend-application.onrender.com/auth/register",
        formData
      );
      // Assuming backend sends userData & message
      const data = response.data;
      toast.success("🦄 Register Successfully !!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      navigate("/login");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Registration failed";
      toast.error(`🚫 ${errorMessage}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // Yup Validation Schema
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, "Minimum 3 characters")
      .max(15, "Maximum 15 characters")
      .required("First Name is required"),
    lastName: Yup.string()
      .min(3, "Minimum 3 characters")
      .max(15, "Maximum 15 characters")
      .required("Last Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(8, "Minimum 8 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <div className="flex items-center justify-center min-h-screen cursor-pointer bg-gray-100 bg-gradient-to-r from-blue-200 via-indigo-200 to-pink-200 font-serif capitalize shadow-lg z-50">
      <div className="bg-white p-8 border-2 border-solid border-violet-400 rounded-md shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center text-violet-400 mb-6">
          Create Your Account
        </h1>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            signUpHandler(values); // Pass form data directly
            setSubmitting(false);
          }}
        >
          {({ isValid, dirty }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-2 rounded-md text-white font-medium ${
                  isValid && dirty
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={!(isValid && dirty)}
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-500 font-medium hover:underline"
            >
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
