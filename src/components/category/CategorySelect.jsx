import { useEffect, useState } from "react";
import { getUserCategory } from "../../services/categoryService";

export default function CategorySelect({ categories, value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Selecione uma categoria</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
