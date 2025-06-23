import { Button, Container, Grid, IconButton, Typography } from "@mui/material";
import CategoryList from "../../components/category/CategoryList";
import AddIcon from "@mui/icons-material/Add";

export default function CategoryListPage() {
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
          <Typography variant="h6" fontWeight="bold">
            Categorias
          </Typography>
        </Grid>
        <Grid size={3}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            href="/categorias/novo"
          >
            Adicionar
          </Button>
        </Grid>
      </Grid>
      <CategoryList />
    </>
  );
}
