// components/CategoryForm.jsx
import { useEffect, useState } from "react";
import { addCategory, updateCategory } from "../../services/categoryService";

const defaultData = {
  name: "",
  type: "despesa",
};

export default function CategoryForm({ initialData, onSuccess }) {
  const [formData, setFormData] = useState(defaultData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    } else {
      setFormData(defaultData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.id) {
        await updateCategory(formData.id, formData);
      } else {
        await addCategory(formData);
      }
      onSuccess?.();
    } catch (error) {
      alert("Erro ao salvar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Nome"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="despesa">Despesa</option>
        <option value="receita">Receita</option>
      </select>

      <button type="submit" disabled={loading}>
        {loading ? "Salvando..." : formData.id ? "Atualizar" : "Salvar"}
      </button>
    </form>
  );
}
