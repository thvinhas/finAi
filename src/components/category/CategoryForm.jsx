// components/CategoryForm.jsx
import { useEffect, useState } from "react";
import { addCategory, updateCategory } from "../../services/categoryService";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const defaultData = {
  name: "",
  type: "despesa",
};

export default function CategoryForm({ initialData = {} }) {
  const navigate = useNavigate();
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
    } catch (error) {
      alert("Erro ao salvar: " + error.message);
    } finally {
      navigate("/categorias");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Grid container spacing={2} sx={{ alignContent: "center" }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            variant="standard"
            label="Nome"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <InputLabel id="tipo_categoria_label">Tipo</InputLabel>
          <Select
            labelId="tipo_categoria_label-simple-select-label"
            value={formData.type}
            label="Tipo"
            name="type"
            onChange={handleChange}
            variant="standard"
            fullWidth
          >
            <MenuItem value="despesa">Despesa</MenuItem>
            <MenuItem value="receita">Receita</MenuItem>
          </Select>
        </Grid>
        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "end", md: "start" },
          }}
        >
          <div></div>
          <Button type="submit" disabled={loading} variant="contained">
            {loading ? "Salvando..." : formData.id ? "Atualizar" : "Salvar"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
