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
import TableOptions from "../utils/TableOptions";

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
        console.log(id);
        await archiveCategory(id);
        fetchCategories();
      } catch (error) {
        alert("Erro ao arquivar categoria: " + error.message);
      }
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
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
                <TableCell align="left">{category.name}</TableCell>
                <TableCell align="left">{category.type}</TableCell>
                <TableCell align="left">
                  <TableOptions
                    url={`/categorias/${category.id}/editar`}
                    handleArchive={() => handleArchive(category.id)}
                  />
                  {/* <button>
                    <Link to={`/categorias/${category.id}/editar`}>Editar</Link>
                  </button>
                  <button onClick={() => handleArchive(category.id)}>
                    arquivar
                  </button> */}
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
  );
}
