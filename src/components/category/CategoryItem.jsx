// components/CategoryItem.jsx
import { TableCell, TableRow } from "@mui/material";
import CategoryActions from "./CategoryActions";

export default function CategoryItem({ category, onEdit, onUpdate }) {
  const { id, name, type } = category;

  return (
    <TableRow
      key={id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {id}
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{type}</TableCell>
      <CategoryActions
        onEdit={() => onEdit(category)}
        onUpdate={onUpdate}
        category={category}
      />
    </TableRow>
  );
}
