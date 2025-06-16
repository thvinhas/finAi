// components/TransactionForm.jsx
import { useEffect, useState } from "react";
import {
  addTransaction,
  updateTransaction,
} from "../../services/transactionService";
import AccountSelect from "../accounts/AccountSelect";
import CategorySelect from "../category/CategorySelect";
import { getUserCategory } from "../../services/categoryService";
import { useNavigate } from "react-router-dom";
import { Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";

const defaultData = {
  type: "despesa",
  title: "",
  amount: "",
  date: new Date().toISOString().slice(0, 10),
  categoryId: "",
  accountId: "",
};

export default function TransactionForm({ initialData, onSuccess }) {
  const navigate = useNavigate();
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
    <form onSubmit={handleSubmit} autoComplete="off">
      <Grid container spacing={2} sx={{ alignContent: "center" }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <InputLabel id="tipo_categoria_label">Tipo</InputLabel>
          <Select
            labelId="tipo_categoria_label-simple-select-label"
            value={formData.type}
            label="type"
            onChange={handleChange}
            variant="standard"
            fullWidth
          >
            <MenuItem value="despesa">Despesa</MenuItem>
            <MenuItem value="receita">Receita</MenuItem>
          </Select>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            variant="standard"
            label="Título"
            fullWidth
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <NumericFormat
            value={formData.amount}
            onChange={handleChange}
            customInput={TextField}
            thousandSeparator
            valueIsNumericString
            prefix="€"
            variant="standard"
            label="Valor"
            name="amount"
            fullWidth
            required
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ alignContent: "center" }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            variant="standard"
            required
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <CategorySelect
            categories={filteredCategories}
            value={formData.categoryId}
            onChange={(value) =>
              setFormData((f) => ({ ...f, categoryId: value }))
            }
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <AccountSelect
            value={formData.accountId}
            onChange={(value) =>
              setFormData((f) => ({ ...f, accountId: value }))
            }
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <button type="submit" disabled={loading} variant="contained">
            {loading ? "Salvando..." : formData.id ? "Atualizar" : "Salvar"}
          </button>
        </Grid>
      </Grid>
    </form>
  );
}
