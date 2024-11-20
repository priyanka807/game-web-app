"use client";
import { useFormik } from "formik";
import "../login/login.css";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const loginSchemas = Yup.object({
  username: Yup.string().min(3).required("Please enter your valid username"),
  password: Yup.string().required("Please enter your password"),
});

const initialValues = {
  username: "",
  password: "",
};

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // State for loading indicator

  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchemas,

      onSubmit: async (values) => {
        setLoading(true); // Start loading
        let payload = {
          id: values.username,
          username: values.username,
          password: values.password,
        };

        try {
          const res = await axios.post(
            "https://game-web-app-mu.vercel.app/api/login",
            payload
          );

          // Success case
          if (payload.username && payload.password) {
            localStorage.setItem("newUser", payload.username);
            toast.success("Logged in successfully!");
            router.push("/");
            payload.username = "";
            payload.password = "";
          }
        } catch (error) {
          // Error case
          toast.error(error.response.data.meaasage);
          console.error(error.response.data.meaasage, "error");
        } finally {
          setLoading(false); // End loading
        }
      },
    });

  return (
    <>
      <div className="form-container">
        <div>
          <form onSubmit={handleSubmit}>
            <h2 className="font-bold">Sign In</h2>
            <p>Please enter your username & password to continue.</p>

            <div className="mb-3">
              <label htmlFor="username" className="input-label">
                Username
              </label>
              <input
                type="text"
                placeholder="...username"
                name="username"
                autoComplete="on"
                className="input-box"
                id="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading} // Disable input when loading
              />
              {touched.username && errors.username ? (
                <h6 className="errors">{errors.username}</h6>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                type="password"
                placeholder="...password"
                name="password"
                autoComplete="on"
                className="input-box"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading} // Disable input when loading
              />
              {touched.password && errors.password ? (
                <h6 className="errors">{errors.password}</h6>
              ) : null}
            </div>

            <button
              type="submit"
              className="continue mt-4"
              disabled={loading} // Disable button when loading
            >
              {loading ? "Loading..." : "Continue"} {/* Button text changes */}
            </button>
          </form>

          {/* Optional Loading Indicator */}
          {loading && <div className="loading">Processing, please wait...</div>}
        </div>
      </div>
    </>
  );
};

export default Login;
