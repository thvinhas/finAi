import { useEffect, useState } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import {
  addCategory,
  getCategoryById,
  updateCategory,
} from "../../services/categoryService";
import { Container } from "@mui/material";
import CategoryForm from "../../components/category/CategoryForm";

export default function CategoryFormPage() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (id) {
      getCategoryById(id).then((data) => {
        if (data) {
          setInitialData({ id, ...data });
        }
      });
    }
  }, [id]);

  return (
    <Container>
      <h2>{id ? "Editar Categoria" : "Nova Categoria"}</h2>
      <CategoryForm initialData={initialData} />
    </Container>
  );
}
