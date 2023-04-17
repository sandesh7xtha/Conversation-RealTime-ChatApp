import React, { useRef } from "react";
import * as si from "./NewAccout.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Alert from "../../customMaterial/alertCOMP/alert";
import { useNavigate } from "react-router-dom";
import { registerRoute, config } from "../../utils/APIRoutes";

const NewAccount = () => {
  const navigate = useNavigate();
  const customAlert = useRef();

  const formik = useFormik({
    initialValues: {
      name: "",

      email: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, "Must be 15 characters or less")
        .min(3, "Must be 3 characters")
        .required("Required"),
      email: Yup.string()
        .email("Invalid Email Format")
        .required("Email Required !"),
      newPassword: Yup.string()
        .min(8, "At least 8 charaters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Password must match")
        .required("Confirm password is required"),
    }),

    onSubmit: (values) => {
      console.log("hello");
      sendToDatabase(values);

      formik.resetForm();
    },
  });

  const sendToDatabase = (values) => {
    console.log(values);
    var data = new FormData();
    data.append("name", values.name);

    data.append("email", values.email);
    data.append("password", values.newPassword);
    data.append("confirmPassword", values.confirmPassword);
    //
    axios
      .post(registerRoute, {
        name: values.name,
        email: values.email,
        password: values.newPassword,
        confirmPassword: values.confirmPassword,
      })
      .then((res) => {
        // console.log("Data inserted");
        console.log(res);
        customAlert.current.success("New Account Register");
        alert("New Account Register");

        navigate("/LoginPage");
      })
      .catch((err) => {
        console.log(err);
        // console.log("data insert fail");
      });
  };

  return (
    <si.root>
      <si.signInBox>
        <si.box>
          <si.subBox>
            <p
              style={{
                fontSize: "large",
                marginLeft: "10rem",
                fontWeight: "bold",
                color: "#121212",
              }}
            >
              Create Account
            </p>

            <si.part>
              <p>Full Name</p>
              <si.flexDiv>
                {formik.touched.name && formik.errors.name ? (
                  <TextField
                    id="name"
                    className="name"
                    variant="standard"
                    error
                    label={formik.errors.name}
                    {...formik.getFieldProps("name")}
                  />
                ) : (
                  <TextField
                    id="name"
                    className="name"
                    label="Full name"
                    variant="standard"
                    {...formik.getFieldProps("name")}
                  />
                )}
              </si.flexDiv>
            </si.part>

            <si.part>
              <p>Email</p>
              {formik.touched.email && formik.errors.email ? (
                <TextField
                  id="email"
                  className="email"
                  name="email"
                  error
                  variant="standard"
                  label={formik.errors.email}
                  {...formik.getFieldProps("email")}
                />
              ) : (
                <TextField
                  id="email"
                  className="email"
                  name="email"
                  label="Email"
                  variant="standard"
                  {...formik.getFieldProps("email")}
                />
              )}
            </si.part>

            <si.part>
              <p>Password</p>
              <si.flexDiv>
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <TextField
                    id="newPassword"
                    className="newPassword"
                    name="password"
                    error
                    type="password"
                    variant="standard"
                    label={formik.errors.newPassword}
                    {...formik.getFieldProps("newPassword")}
                  />
                ) : (
                  <TextField
                    id="newPassword"
                    className="newPassword"
                    name="password"
                    label="New password"
                    type="password"
                    variant="standard"
                    {...formik.getFieldProps("newPassword")}
                  />
                )}
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <TextField
                    id="confirmPassword"
                    className="confirmPassword"
                    name="confirmPassword"
                    error
                    type="password"
                    variant="standard"
                    label={formik.errors.confirmPassword}
                    {...formik.getFieldProps("confirmPassword")}
                  />
                ) : (
                  <TextField
                    id="confirmPassword"
                    className="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    variant="standard"
                    {...formik.getFieldProps("confirmPassword")}
                  />
                )}
              </si.flexDiv>
            </si.part>

            <si.part>
              <Button
                className="signUpButton"
                style={{
                  backgroundColor: "#121212",
                  color: "white",
                  borderColor: "#121212",
                }}
                variant="outlined"
                onClick={formik.handleSubmit}
              >
                Sign Up
              </Button>
            </si.part>

            {/* onSubmit={formik.handleSubmit} */}
            <si.part>
              <p
                className="info"
                style={{
                  fontSize: "smaller",
                  marginLeft: "4rem",
                  color: "#8797A8",
                }}
              >
                We value your privacy. Your details are safe with us.
              </p>
            </si.part>
            <Alert ref={customAlert} />
          </si.subBox>
        </si.box>
      </si.signInBox>
    </si.root>
  );
};

export default NewAccount;
