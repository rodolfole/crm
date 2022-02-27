import { Form, Formik, FormikHelpers } from "formik";
import { Alert, Box, Button, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import TextInput from "../components/form/TextInput";
import { LoginInput, useLoginMutation, Users } from "../generated/graphql";
import { authLogin } from "../redux/actions/authAction";
import { JWTDecode } from "../utils/jwt";
import { AppState } from "../interfaces";

const INITIAL_VALUES: LoginInput = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(({ AUTH }: AppState) => AUTH);
  const [error, setError] = useState("");

  const [login] = useLoginMutation();

  const VALIDATION_SCHEMA = Yup.object({
    email: Yup.string()
      .email("El email no tiene un formato valido")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (
    values: LoginInput,
    { resetForm }: FormikHelpers<LoginInput>
  ) => {
    setError("");
    try {
      const resp = await login({
        variables: {
          input: { ...values },
        },
      });

      if (resp.data && resp.data.login) {
        localStorage.setItem("token", resp.data.login.jwt);
        dispatch(authLogin(JWTDecode(resp.data.login.jwt) as Partial<Users>));
        resetForm();
        navigate("/admin/clients");
      }
    } catch (error: any) {
      toast.error(error.message.replace("GraphQL error: ", ""));
      setError(error.message.replace("GraphQL error: ", ""));
    }
  };

  useEffect(() => {
    if (user?.id) navigate("/admin/clients");
  }, [navigate, user]);

  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
      <Paper elevation={4} style={{ width: "430px" }}>
        <Box px={3} py={5}>
          <Formik
            initialValues={INITIAL_VALUES}
            onSubmit={onSubmit}
            validationSchema={VALIDATION_SCHEMA}
          >
            {({ isSubmitting, isValidating }) => (
              <Form className="wrapper">
                <TextInput label="Email" name="email" type="email" />
                <TextInput label="Password" name="password" type="password" />
                <Button
                  color="primary"
                  disabled={isSubmitting || isValidating}
                  fullWidth
                  sx={{ marginBottom: "15px" }}
                  type="submit"
                  variant="contained"
                >
                  Login
                </Button>
                <Typography>
                  You do not have an account?{" "}
                  <Link to="/register">Create account</Link>
                </Typography>

                {error && (
                  <Alert variant="filled" severity="error">
                    {error}
                  </Alert>
                )}
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Box>
  );
};
