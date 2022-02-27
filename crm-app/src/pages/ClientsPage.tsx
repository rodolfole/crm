import dayjs from "dayjs";
import { Box, Button, Typography } from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ClientForm } from "../components/clients/ClientForm";
import { Dialog } from "../components/ui/Dialog";
import {
  Clients,
  useClientsSellerQuery,
  useDeleteClientMutation,
} from "../generated/graphql";
import { AppState } from "../interfaces";
import { clientActive, clientClearActive } from "../redux/actions/clientAction";

export const ClientsPage = () => {
  const dispatch = useDispatch();
  const { client } = useSelector(({ CLIENT }: AppState) => CLIENT);
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);
  const [pageSize, setPageSize] = useState<number>(5);

  const { data, refetch } = useClientsSellerQuery();
  const [deleteClient] = useDeleteClientMutation();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", hideable: false, flex: 1 },
    {
      editable: false,
      field: "firstName",
      flex: 1,
      headerName: "First name",
    },
    {
      editable: false,
      field: "lastName",
      flex: 1,
      headerName: "Last name",
    },
    {
      editable: false,
      field: "email",
      flex: 1,
      headerName: "Email",
    },
    {
      editable: false,
      field: "phone",
      flex: 1,
      headerName: "Phone",
    },
    {
      align: "left",
      editable: false,
      field: "createdAt",
      flex: 1,
      headerAlign: "left",
      headerName: "Date",
      type: "number",
      valueGetter: (params: GridValueGetterParams) =>
        dayjs(params.row.createdAt).format("MM/DD/YYYY"),
    },
    {
      description: "This column has a value getter and is not sortable.",
      field: "actions",
      filterable: false,
      flex: 1,
      headerName: "Actions",
      sortable: false,
      renderCell: (params: GridCellParams) => {
        return (
          <>
            <Button
              color="warning"
              onClick={() => handleEdit(params.row)}
              variant="contained"
              sx={{ marginRight: "8px" }}
            >
              Edit
            </Button>
            <Button
              color="error"
              onClick={() => handleDelete("OPEN-MODAL", params.row)}
              variant="contained"
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const rows = data?.clientsSeller
    ? data?.clientsSeller.map(({ __typename, sellerId, ...rest }) => ({
        ...rest,
      }))
    : [];

  const handleDelete = async (
    type: "OPEN-MODAL" | "DELETE-CLIENT" | "CANCEL",
    clientData?: Clients
  ) => {
    if (type === "CANCEL") {
      setOpen(false);
      setIsDeleting(false);
      clearClient();
      return;
    } else if (type === "OPEN-MODAL") {
      setOpen(true);
      setIsDeleting(true);
      setClient(clientData!);
      return;
    }

    const resp = await deleteClient({
      variables: {
        id: client?.id!,
      },
    });

    if (resp.data?.deleteClient) {
      refetch();
      handleClose();
      setIsDeleting(false);
    }
  };

  const handleEdit = (client: Clients) => {
    setClient(client);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    clearClient();
  };

  const clearClient = () => dispatch(clientClearActive());

  const setClient = (client: Clients) => dispatch(clientActive(client));

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      style={{ height: 400, width: "100%" }}
    >
      <Button
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ marginBottom: "15px", alignSelf: "end" }}
        variant="contained"
      >
        Create
      </Button>
      <DataGrid
        autoHeight
        checkboxSelection={false}
        columns={columns}
        disableSelectionOnClick
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        pageSize={pageSize}
        rows={rows}
        rowsPerPageOptions={[5, 10, 20]}
      />

      <Dialog
        onClose={() => (client.id ? handleClose() : setOpen(false))}
        onOpen={open}
        children={
          !isDeleting ? (
            <ClientForm
              onClose={() => (client.id ? handleClose() : setOpen(false))}
              refetch={refetch}
            />
          ) : (
            <Box>
              <Typography variant="h6" style={{ marginBottom: "30px" }}>
                Are you sure you want to delete the client?
              </Typography>
              <Box display="flex" justifyContent="space-evenly">
                <Button
                  color="error"
                  onClick={() => handleDelete("DELETE-CLIENT")}
                  variant="contained"
                  style={{ marginRight: "10px" }}
                >
                  Delete
                </Button>
                <Button
                  color="inherit"
                  onClick={() => handleDelete("CANCEL")}
                  variant="contained"
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )
        }
      />
    </Box>
  );
};
