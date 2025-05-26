// components/CategoryList.jsx
import { useEffect, useState } from "react";
import { getUserCategory } from "../../services/categoryService";
import CategoryForm from "./CategoryForm";
import CategoryItem from "./CategoryItem";

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

  // Função para lidar com o sucesso de criar/editar
  const handleSuccess = () => {
    fetchCategories();
    setEditingCategory(null); // Limpa o formulário
  };

  return (
    <div>
      <h2>{editingCategory ? "Editar Categoria" : "Nova Categoria"}</h2>
      <CategoryForm initialData={editingCategory} onSuccess={handleSuccess} />

      <h2>Categorias</h2>
      {categories.length > 0 ? (
        categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            onEdit={setEditingCategory}
            onUpdate={fetchCategories}
          />
        ))
      ) : (
        <p>Nenhuma categoria cadastrada.</p>
      )}
    </div>
  );
}
