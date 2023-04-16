import React, { useRef } from "react";
import * as si from "./LoginPage.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Alert from "../../customMaterial/alertCOMP/alert";
import { useNavigate } from "react-router-dom";
import { loginRoute } from "../../utils/APIRoutes";

export const LoginPage = () => {
  const navigate = useNavigate();
  const customAlert = useRef();

  // password textfiled toggle switch
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // foriput validation
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email Format")
        .required("Email Required !!"),
      password: Yup.string()
        .min(6, "Password must be at least 6 charaters")
        .required("Password Required !!"),
    }),

    onSubmit: (values) => {
      sendToDatabase(values);
      formik.resetForm();
    },
  });

  const sendToDatabase = (values) => {
    console.log(values);

    axios
      .post(loginRoute, {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        // console.log("Data inserted");
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("id", res.data.id);
        customAlert.current.success("Welcome to conversation");
        alert("Welcome to conversation");

        navigate("/ChatPage");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
        // console.log("data insert fail");
      });
  };

  return (
    <div>
      <si.root>
        <si.signInBox>
          <si.box>
            <si.subBox>
              <p
                style={{
                  fontSize: "large",
                  marginLeft: "8rem",
                  fontWeight: "bold",
                  color: "#121212",
                }}
              >
                Sign In
              </p>

              <si.part>
                <p>Email</p>
                {formik.touched.email && formik.errors.email ? (
                  <TextField
                    id="email"
                    className="email"
                    label={formik.errors.email}
                    error
                    variant="standard"
                    {...formik.getFieldProps("email")}
                  />
                ) : (
                  <TextField
                    id="email"
                    className="email"
                    label=" Email"
                    variant="standard"
                    {...formik.getFieldProps("email")}
                  />
                )}
              </si.part>

              <si.part>
                <p>Password</p>

                {formik.touched.password && formik.errors.password ? (
                  <FormControl error>
                    <InputLabel htmlFor="standard-adornment-password">
                      {formik.errors.password}
                    </InputLabel>
                    <Input
                      id="password"
                      className="password"
                      type={showPassword ? "text" : "password"}
                      {...formik.getFieldProps("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                ) : (
                  <FormControl>
                    <InputLabel htmlFor="standard-adornment-password">
                      {"Password"}
                    </InputLabel>
                    <Input
                      id="password"
                      className="password"
                      type={showPassword ? "text" : "password"}
                      {...formik.getFieldProps("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                )}
              </si.part>
              <si.part>
                <Button
                  className="signInButton"
                  style={{
                    backgroundColor: "#121212",
                    color: "white",
                    borderColor: "#121212",
                  }}
                  variant="outlined"
                  onClick={formik.handleSubmit}
                >
                  Sign In
                </Button>
              </si.part>

              <si.part>
                <p
                  className="info"
                  style={{
                    fontSize: "smaller",
                    marginLeft: "0.5rem",
                    color: "#8797A8",
                  }}
                >
                  We value your privacy. Your details are safe with us.
                </p>
              </si.part>
              <si.part>
                <Button
                  className="signInButton"
                  style={{
                    backgroundColor: "#121212",
                    color: "white",
                    borderColor: "#121212",
                  }}
                  variant="outlined"
                  onClick={() => navigate("/createNewAccount")}
                >
                  Create New Acount
                </Button>
              </si.part>
              <Alert ref={customAlert} />
            </si.subBox>
          </si.box>
        </si.signInBox>
      </si.root>
    </div>
  );
};
