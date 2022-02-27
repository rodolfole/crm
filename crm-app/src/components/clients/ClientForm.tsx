import { ApolloQueryResult } from "@apollo/client";
import { Button } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

import TextInput from "../form/TextInput";
import {
  Clients,
  ClientInput,
  ClientsSellerDocument,
  ClientsSellerQuery,
  Exact,
  useCreateClientMutation,
  useUpdateClientMutation,
} from "../../generated/graphql";
import { AppState } from "../../interfaces";

type Props = {
  onClose: () => void;
  refetch: (
    variables?:
      | Partial<
          Exact<{
            [key: string]: never;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<ClientsSellerQuery>>;
};

const INITIAL_VALUES: ClientInput = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
};

const VALIDATION_SCHEMA = Yup.object({
  email: Yup.string()
    .email("El email no tiene un formato valido")
    .required("Email is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phone: Yup.string().min(10, "Must have at least 10 numbers").nullable(),
});

export const ClientForm = ({ onClose, refetch }: Props) => {
  const [updateClient] = useUpdateClientMutation();
  const [createClient] = useCreateClientMutation();

  const { client } = useSelector(({ CLIENT }: AppState) => CLIENT);
  const onSubmit = async (
    values: Partial<Clients>,
    { resetForm }: FormikHelpers<Partial<Clients>>
  ) => {
    const data = {
      email: values.email!,
      firstName: values.firstName!,
      lastName: values.lastName!,
      phone: String(values.phone),
    };

    if (values.id) {
      const resp = await updateClient({
        variables: {
          id: values.id!,
          input: {
            ...data,
          },
        },
      });

      if (resp.data && resp.data?.updateClient) {
        onClose();
        resetForm();
        refetch();
        toast.success(
          `Client ${resp.data?.updateClient.firstName} ${resp.data?.updateClient.lastName} updated`
        );
      }
    } else {
      const resp = await createClient({
        variables: {
          input: { ...data },
        },
        update: (cache, { data }) => {
          const clients = cache.readQuery<ClientsSellerQuery>({
            query: ClientsSellerDocument,
          });

          cache.writeQuery({
            query: ClientsSellerDocument,
            data: {
              clientsSeller: [
                ...(clients?.clientsSeller as Clients[]),
                data?.createClient,
              ],
            },
          });
        },
      });

      if (resp.data && resp.data?.createClient) {
        onClose();
        resetForm();
        toast.success(
          `Client ${resp.data?.createClient.firstName} ${resp.data?.createClient.lastName} updated`
        );
      }
    }
  };

  return (
    <>
      <Formik
        initialValues={client || INITIAL_VALUES}
        onSubmit={onSubmit}
        validationSchema={VALIDATION_SCHEMA}
        enableReinitialize
      >
        {({ isSubmitting, isValidating, values }) => (
          <Form className="wrapper">
            <TextInput label="First name" name="firstName" />
            <TextInput label="Last name" name="lastName" />
            <TextInput label="Email" name="email" type="email" />
            <TextInput label="Phone" name="phone" type="number" />
            <Button
              color="primary"
              disabled={isSubmitting || isValidating}
              fullWidth
              type="submit"
              variant="contained"
            >
              {values.id ? "Update" : "Create"}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
