import { useEffect, useState } from "react";
import { getUserCategory } from "../../services/categoryService";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function CategorySelect({ categories, value, onChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="tipo_label">Category</InputLabel>
      <Select
        labelId="tipo_label"
        id="tipo"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="standard"
        fullWidth
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
