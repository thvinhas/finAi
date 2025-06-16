import TransactionList from "../../components/transaction/TransactionList";
import { Button, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function TransactionListPage() {
  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        sx={{ marginBottom: 5 }}
        spacing={2}
      >
        <Grid size={{ sx: 4, md: 9 }}>
          <Typography variant="h5">Transacoes</Typography>
        </Grid>
        <Grid size={3}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            href="/transacoes/novo"
          >
            Adicionar
          </Button>
        </Grid>
      </Grid>
      <TransactionList />
    </>
  );
}
