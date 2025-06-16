import { Button, Grid, Typography } from "@mui/material";
import AccountList from "../../components/accounts/AccountList";
import AddIcon from "@mui/icons-material/Add";

export default function AccountListPage() {
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
          <Typography variant="h5">Contas</Typography>
        </Grid>
        <Grid size={3}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            href="/contas/novo"
          >
            Adicionar
          </Button>
        </Grid>
      </Grid>
      <AccountList />
    </>
  );
}
