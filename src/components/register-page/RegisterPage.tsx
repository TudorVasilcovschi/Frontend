import { Field, Form, Formik, FormikHelpers } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

interface FormValues {
  username: string;
  password: string;
}

const initialLoginValues: FormValues = { username: "", password: "" };

export const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { onRegister, token } = useAuth();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      await onRegister(values.username, values.password);
      navigate("/top10");
    } catch (err: any) {
      if (!err.response) {
        alert("No Server Response");
      } else if (err.response?.status === 409) {
        alert("Username Taken");
      } else {
        alert("Registration Failed");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (token) return <div>You already registered and are logged in!</div>;

  return (
    <div className="svgBackground">
      <div className="login-container">
        <div className="login-form">
          <h2>Register</h2>
          <p>Enter your details to create your account</p>
          <Formik initialValues={initialLoginValues} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <div className="input-group">
                  <Field type="text" name="username" placeholder="Enter Email" />
                </div>
                <div className="input-group">
                  <Field type="password" name="password" placeholder="Password" />
                </div>
                <button type="submit" className="sign-in-btn" disabled={isSubmitting}>
                  Register
                </button>
                <div className="register-link">
                  <p>
                    Do you already have an account? <a onClick={() => navigate("/login")}>Sign in</a>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
