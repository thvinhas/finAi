import { useParams } from "react-router-dom";
import TransactionForm from "../../components/transaction/TransactionForm";
import { useEffect, useState } from "react";
import { getTransactionById } from "../../services/transactionService";
import { Grid, Typography } from "@mui/material";

export default function TransactionFormPage() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (id) {
      getTransactionById(id).then((data) => {
        if (data) {
          setInitialData({ id, ...data });
        }
      });
    }
  }, [id]);

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        sx={{ marginBottom: 2 }}
      >
        <Typography variant="h5" align="center">
          {id ? "Editar Transacao" : "Nova Transacao"}
        </Typography>
      </Grid>
      <TransactionForm initialData={initialData} />
    </>
  );
}
