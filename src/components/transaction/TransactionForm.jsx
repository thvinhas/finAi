// components/TransactionForm.jsx
import { useEffect, useState } from "react";
import {
  addTransaction,
  updateTransaction,
} from "../../services/transactionService";
import AccountSelect from "../accounts/AccountSelect";
import CategorySelect from "../category/CategorySelect";
import { getUserCategory } from "../../services/categoryService";

const defaultData = {
  type: "despesa",
  title: "",
  amount: "",
  date: new Date().toISOString().slice(0, 10),
  categoryId: "",
  accountId: "",
};

export default function TransactionForm({ initialData, onSuccess }) {
  const [formData, setFormData] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        date: initialData.date?.slice(0, 10),
      });
    } else {
      setFormData(defaultData);
    }
  }, [initialData]);

  useEffect(() => {
    // Exemplo de como buscar as categorias
    async function fetchCategories() {
      const categories = await getUserCategory(); // Função que você já tem
      setAllCategories(categories || []); // Garante que é sempre um array
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    // Só filtra se allCategories for um array
    if (Array.isArray(allCategories)) {
      setFilteredCategories(
        allCategories.filter((category) => category.type === formData.type)
      );
    }
  }, [formData.type, allCategories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSave = {
        ...formData,
        amount: parseFloat(formData.amount),
      };

      if (formData.id) {
        await updateTransaction(formData.id, dataToSave);
      } else {
        await addTransaction(dataToSave);
      }

      onSuccess?.();
    } catch (err) {
      alert("Erro ao salvar: " + err.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="despesa">Despesa</option>
        <option value="receita">Receita</option>
      </select>

      <input
        type="text"
        name="title"
        placeholder="Título"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="amount"
        placeholder="Valor"
        value={formData.amount}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />

      <CategorySelect
        categories={filteredCategories}
        value={formData.categoryId}
        onChange={(value) => setFormData((f) => ({ ...f, categoryId: value }))}
      />

      <AccountSelect
        value={formData.accountId}
        onChange={(value) => setFormData((f) => ({ ...f, accountId: value }))}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Salvando..." : formData.id ? "Atualizar" : "Salvar"}
      </button>
    </form>
  );
}
