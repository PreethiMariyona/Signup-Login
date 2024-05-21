import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export const Login = ({ onFormSwitch, onLogin }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const authenticatedUser = users.find(
        (user) => user.email === values.email && user.password === values.password
      );

      if (authenticatedUser) {
        onLogin(authenticatedUser);
      } else {
        alert("Invalid email or password");
      }
    },
  });

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="youremail@gmail.com"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="********"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}

        <button type="submit">Log In</button>
      </form>
      <button
        className="link-btn"
        onClick={() => onFormSwitch("register")}
      >
        Don't have an account? Register here.
      </button>
    </div>
  );
};
