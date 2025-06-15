// components/CategoryActions.jsx
import { TableCell } from "@mui/material";
import { deleteCategory } from "../../services/categoryService";

export default function CategoryActions({ category, onUpdate, onEdit }) {
  const handleDelete = async () => {
    if (window.confirm("Deseja realmente excluir?")) {
      await deleteCategory(category.id);
      onUpdate?.();
    }
  };

  return (
    <TableCell>
      <button onClick={onEdit}>Editar</button>
      <button onClick={handleDelete}>Excluir</button>
    </TableCell>
  );
}
