import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAccountById } from "../../services/accountService";
import { Grid, Typography } from "@mui/material";
import AccountForm from "../../components/accounts/AccountForm";

export default function AccountFormPage() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (id) {
      getAccountById(id).then((data) => {
        if (data) {
          setInitialData({ id, ...data });
        }
      });
    }
  }, [id]);
  return (
    <>
      <Grid container direction="row" alignItems="center">
        <Typography variant="h5" align="center">
          {id ? "Editar Conta" : "Nova Conta"}
        </Typography>
      </Grid>
      <AccountForm initialData={initialData} />
    </>
  );
}
