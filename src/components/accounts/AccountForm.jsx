import { useEffect, useState } from "react";
import { addAccount, updateAccount } from "../../services/accountService";
import { Button, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";

const defaultData = {
  name: "",
};

export default function AccountForm({ initialData = {} }) {
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
        await updateAccount(formData.id, formData);
      } else {
        const docRef = await addAccount(formData);
        console.log("Conta criada com ID:", docRef.id);
      }
    } catch (err) {
      alert("Erro ao salvar: " + err.message);
    } finally {
      navigate("/contas");
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
          <NumericFormat
            value={formData.value}
            onChange={handleChange}
            customInput={TextField}
            thousandSeparator
            valueIsNumericString
            prefix="€"
            variant="standard"
            label="Valor"
            name="value"
            fullWidth
            required
          />
        </Grid>{" "}
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
