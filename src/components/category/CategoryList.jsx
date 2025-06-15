// components/CategoryList.jsx
import { useEffect, useState } from "react";
import {
  archiveCategory,
  getUserCategory,
} from "../../services/categoryService";
import CategoryForm from "./CategoryForm";
import CategoryItem from "./CategoryItem";
import {
  Container,
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { GridAddIcon } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  // Função para buscar categorias
  const fetchCategories = async () => {
    const data = await getUserCategory();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleArchive = async (id) => {
    const confirm = window.confirm(
      "Tem certeza que deseja arquivar essa categoria?"
    );
    if (confirm) {
      try {
        await archiveCategory(id);
        fetchCategories();
      } catch (error) {
        alert("Erro ao arquivar categoria: " + error.message);
      }
    }
  };

  return (
    <Container>
      <h1>Categorias</h1>
      <Fab color="primary" aria-label="add">
        <Link to="/categorias/nova">
          <GridAddIcon />
        </Link>
      </Fab>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="left">Categoria</TableCell>
              <TableCell align="left">Tipo</TableCell>
              <TableCell align="left">Acoes</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <TableRow
                  key={category.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {category.id}
                  </TableCell>
                  <TableCell align="left">{category.name}</TableCell>
                  <TableCell align="left">{category.type}</TableCell>
                  <TableCell align="left">
                    <button>
                      <Link to={`/categorias/${category.id}/editar`}>
                        Editar
                      </Link>
                    </button>
                    <button onClick={() => handleArchive(category.id)}>
                      arquivar
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>Nenhuma categoria cadastrada.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
