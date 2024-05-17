import { Field, Form, Formik, FormikHelpers } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

interface FormValues {
  username: string;
  password: string;
}

const initialLoginValues: FormValues = { username: "", password: "" };

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { onLogin, token } = useAuth();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      await onLogin(values.username, values.password);
      navigate(from.pathname);
    } catch (err: any) {
      if (!err.response) {
        alert("No Server Response");
      } else if (err.response?.status === 404) {
        alert("User not found");
      } else if (err.response?.status === 401) {
        alert("Password is incorrect");
      } else {
        alert("Login Failed");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (token) return <div>You are already logged in!</div>;

  return (
    <div className="svgBackground">
      <div className="login-container">
        <div className="login-form">
          <h2>Login</h2>
          <p>Enter your details to get sign in to your account</p>
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
                  Sign in
                </button>
                <div className="register-link">
                  <p>
                    Don't have an account? <a onClick={() => navigate("/register")}>Register Now</a>
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
