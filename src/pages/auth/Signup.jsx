import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import TextField from "../../components/TextField";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validate = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Email is not invalid")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values) => {
    const { email, password } = values;

    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        values,
        timeStamp: serverTimestamp(),
      });
      toast.success("User signed up successfully!");
      navigate("/join");
      setLoading(false);
    } catch (err) {
      toast.error("There was an error!");
    }
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
            <div className="signupInput">
              <h1>Sign Up</h1>
              <Form>
                <TextField label="First Name" name="firstName" type="text" />
                <TextField label="Last Name" name="lastName" type="text" />
                <TextField label="Email" name="email" type="email" />
                <TextField label="Password" name="password" type="password" />
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                />
                <button type="submit" disabled={loading === true}>
                  Signup
                </button>
              </Form>
              <p>
                Already have an account? <Link to="/join">Login here</Link>
              </p>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
