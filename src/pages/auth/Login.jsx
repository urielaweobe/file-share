import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Formik, Form } from "formik";
import TextField from "../../components/TextField";
import * as Yup from "yup";

import { Google, GitHub } from "@mui/icons-material";

import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, gAuth, gitAuth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { dispatch } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validate = Yup.object({
    email: Yup.string()
      .email("Email is not invalid")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values) => {
    const { email, password } = values;

    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user) {
          toast.success("User logged in successfully!");
        }
        dispatch({ type: "LOGIN", payload: user });
        navigate("/dashboard");
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        if (errorMessage) {
          toast.error("Please enter a valid credential");
        }
      });
  };

  const handleGoogle = () => {
    signInWithPopup(auth, gAuth)
      .then((result) => {
        const user = result.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/dashboard");
        if (user) {
          toast.success("User login successfully!");
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        if (errorMessage) {
          toast.error("An error occured!");
        }
      });
  };

  const handleGithub = () => {
    signInWithPopup(auth, gitAuth)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/dashboard");
        if (user) {
          toast.success("User signed up successfully!");
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        if (errorMessage) {
          toast.error("An error occured!");
        }
      });
  };

  return (
    <div className="login">
      <div className="container">
        <Formik
          initialValues={initialValues}
          validationSchema={validate}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <div className="loginInput">
              <h1>Login</h1>
              <Form>
                <TextField label="Email" name="email" type="email" />
                <TextField label="Password" name="password" type="password" />

                <button type="submit" disabled={loading === true}>
                  Login
                </button>

                <div className="icons">
                  <Link to="" onClick={handleGoogle}>
                    <Google className="icon" />
                  </Link>
                  <Link to="" onClick={handleGithub}>
                    <GitHub className="icon" />
                  </Link>
                </div>
              </Form>
              <p>
                Don't have an account? <Link to="/sign-up">Signup here</Link>
              </p>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
