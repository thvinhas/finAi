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
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import { serverTimestamp, Timestamp } from "firebase/firestore";
import { formatFirestoreDate, formatToInputDate } from "../../utils/formatters";

const defaultData = {
  type: "despesa",
  title: "",
  amount: "00.00",
  transactionDate: Timestamp.fromDate(new Date()),
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
      // console.log(hu);

      setFormData({
        ...initialData,
        transactionDate: initialData.transactionDate
          .toDate()
          .toISOString()
          .slice(0, 10),
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
        transactionDate: Timestamp.fromDate(new Date(formData.transactionDate)),
      };

      if (formData.id) {
        await updateTransaction(formData.id, dataToSave);
      } else {
        await addTransaction(dataToSave);
      }
    } catch (err) {
      alert("Erro ao salvar: " + err.message);
    } finally {
      navigate("/transacoes");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Grid container spacing={2} sx={{ alignContent: "center" }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="tipo_tipo_label">Tipo</InputLabel>
            <Select
              labelId="tipo_tipo_label"
              value={formData.type}
              label="type"
              name="type"
              onChange={handleChange}
              variant="standard"
            >
              <MenuItem value="despesa">Despesa</MenuItem>
              <MenuItem value="receita">Receita</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth>
            <TextField
              variant="standard"
              label="Título"
              fullWidth
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth>
            <NumericFormat
              value={formData.amount}
              onValueChange={(values) =>
                setFormData((f) => ({ ...f, amount: values.floatValue || 0 }))
              }
              customInput={TextField}
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale
              allowNegative={true}
              prefix="€ "
              label="Valor"
              name="amount"
              fullWidth
              required
              variant="standard"
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{ alignContent: "center", marginTop: { md: 2 } }}
      >
        <Grid size={{ xs: 12, md: 3 }}>
          <FormControl fullWidth>
            <TextField
              type="date"
              name="transactionDate"
              value={formData.transactionDate}
              onChange={handleChange}
              variant="standard"
              required
            />
          </FormControl>
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
          <FormControl fullWidth>
            <Button type="submit" disabled={loading} variant="contained">
              {loading ? "Salvando..." : formData.id ? "Atualizar" : "Salvar"}
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
}
