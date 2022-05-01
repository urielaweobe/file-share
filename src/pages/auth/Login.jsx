import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import TextField from "../../components/TextField";
import * as Yup from "yup";

import { Google, GitHub, Facebook, Twitter } from "@mui/icons-material";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
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

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
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

                <button type="submit">Login</button>
                <div className="icons">
                  <Google className="icon" />
                  <GitHub className="icon" />
                  <Facebook className="icon" />
                  <Twitter className="icon" />
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
