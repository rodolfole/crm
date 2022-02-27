import { Form, Formik, FormikHelpers } from "formik";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import TextInput from "../components/form/TextInput";
import {
  UserInput,
  useRegisterMutation,
  useExistUserMutation,
} from "../generated/graphql";
import { useSelector } from "react-redux";
import { AppState } from "../interfaces";
import { useEffect } from "react";

interface UserRegister extends UserInput {
  password2: string;
}

const INITIAL_VALUES: UserRegister = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  password2: "",
};

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector(({ AUTH }: AppState) => AUTH);

  const [register] = useRegisterMutation();
  const [existUser] = useExistUserMutation();

  const VALIDATION_SCHEMA = Yup.object({
    email: Yup.string()
      .email("The email does not have a valid format")
      .min(4, "The email must be at least 4 characters")
      .test(
        "Unique Email",
        "Email is already in use",
        async (value) =>
          value !== undefined &&
          value.length > 3 &&
          (await handleCheckExistUser(value as string))
      )
      .required("Email is required"),
    firstName: Yup.string().required("Firstname is required"),
    lastName: Yup.string().required("Lastname is required"),
    password: Yup.string()
      .min(6, "The password must be at least 6 characters")
      .required("Password is required"),
    password2: Yup.string()
      .min(6, "The password must be at least 6 characters")
      .oneOf(
        [Yup.ref("password"), null],
        "Las contraseñas tienen que ser iguales"
      )
      .required("Password is required"),
  });

  const handleCheckExistUser = async (email: string) => {
    const resp = await existUser({
      variables: {
        email,
      },
    });

    if (!resp.data?.existUser) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = async (
    values: UserRegister,
    { resetForm }: FormikHelpers<UserRegister>
  ) => {
    const { password2, ...user } = values;
    try {
      const resp = await register({
        variables: {
          input: { ...user },
        },
      });

      if (resp.data && resp.data.register) {
        toast.success("Successfully registered user");
        resetForm();
        navigate("/");
      }
    } catch (error) {}
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
            validateOnChange={false}
          >
            {({ errors, isSubmitting, isValidating }) => (
              <Form className="wrapper">
                <TextInput label="Firstname" name="firstName" />
                <TextInput label="Lastname" name="lastName" />
                <TextInput label="Email" name="email" type="email" />
                <TextInput label="Password" name="password" type="password" />
                <TextInput
                  label="Repeat Password"
                  name="password2"
                  type="password"
                />
                <Button
                  color="primary"
                  disabled={
                    Object.keys(errors).length !== 0 ||
                    isSubmitting ||
                    isValidating
                  }
                  fullWidth
                  sx={{ marginBottom: "15px" }}
                  type="submit"
                  variant="contained"
                >
                  Register
                </Button>
                <Typography>
                  You already have an account? <Link to="/login">Log in</Link>
                </Typography>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Box>
  );
};
