import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import TextField from "../../components/TextField";
import * as Yup from "yup";

import { Google, GitHub } from "@mui/icons-material";

import { signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup  } from "firebase/auth";
import { auth, gAuth, gitAuth } from "../../firebase";

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

  const handleGoogle =() => {
    signInWithPopup(auth, gAuth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
    console.log(user)
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }

  const handleGithub = () => {
    signInWithPopup(auth, gitAuth)
  .then((result) => {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    // ...
    console.log(user)
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GithubAuthProvider.credentialFromError(error);
    // ...
  });
  }

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
