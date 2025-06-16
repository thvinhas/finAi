import { useEffect, useState } from "react";
import { getUserCategory } from "../../services/categoryService";
import { InputLabel, MenuItem, Select } from "@mui/material";

export default function CategorySelect({ categories, value, onChange }) {
  return (
    <>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="standard"
        fullWidth
        label="Tipo"
        labelId="tipo_categoria_label-simple-select-label"
      >
        <MenuItem>Selecione uma Categoria</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
