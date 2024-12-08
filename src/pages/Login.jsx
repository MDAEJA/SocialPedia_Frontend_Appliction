import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { setLogin } from "../redux/user";
import { useDispatch, useSelector } from "react-redux";


function Login() {
  const navigate = useNavigate();
  const userName = useSelector((state)=>state.user.userName);
  const token = useSelector((state)=>state.user.token);
  const user_id = useSelector((state)=>state.user._id);
 
  

  const dispatch = useDispatch();

  const signinHandler = ()=>{
    navigate('/signin')
  }

  const loginHandler = async (values) => {
    try {
      const response = await axios.post("https://socialpedia-backend-application.onrender.com/auth/login", values);
      if(!response){
        toast.error('Create Account !!!!')
        return
      }
     const userData = response.data.userRegister;
       console.log(userData);
       console.log(userData._id);
       console.log(userData.firstName);
      console.log(response.data.userRegister);

      const payload = {
        name : userData.firstName,
        token : response.token,
        id : userData._id,
        picture : userData.picturePath
      }
      dispatch(setLogin(payload));

      // Assuming your backend sends a response like { message: 'Login successful', userData: {...} }
      const data = response.data;
      
      console.log(response.data.userRegister._id);
      console.log("Response Data:", data);
      console.log(userName);
      console.log(token);
      console.log(user_id)
      localStorage.setItem('User',JSON.stringify({'name' : userName,'token' : token}));

  const storedUser = localStorage.getItem('user');
 
if (storedUser) {
  const { name, token } = JSON.parse(storedUser);
  console.log("Name:", name);
  console.log("Token:", token);
};
      // Show success message
      toast.success(data?.message || "Login successful!");
      // Navigate to the home page
      navigate("/");
    } catch (err) {
      console.error("Error:", err);

      // Extract and display error message from backend response (if available)
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      toast.error(`🚫 ${errorMessage}`);
    }
  };

  // Yup Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <div className="flex items-center justify-center min-h-screen cursor-pointer bg-gray-100 bg-gradient-to-r from-blue-200 via-indigo-200 to-pink-200 font-serif capitalize">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-sm border-2 border-solid border-violet-400 ">
        <h1 className="text-2xl font-semibold text-center text-violet-400 mb-6">
          Log In to Your Account
        </h1>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log("Login Form Submitted", values);
            loginHandler(values);
            setSubmitting(false);
          }}
        >
          {({ isValid, dirty }) => (
            <Form className="space-y-4">
              {/* Email */}
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

              {/* Password */}
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

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-2 rounded-md text-white font-medium ${
                  isValid && dirty
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={!(isValid && dirty)}
              >
                Log In
              </button>
            </Form>
          )}
        </Formik>

        {/* Signup Option */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href=''
              onClick={signinHandler}
              className="text-blue-500 font-medium hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
