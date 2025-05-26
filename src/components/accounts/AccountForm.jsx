import { useEffect, useState } from "react";
import { addAccount, updateAccount } from "../../services/accountService";

const defaultData = {
  name: "",
};

export default function AccountForm({ initialData, onSuccess }) {
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

      onSuccess?.();
    } catch (err) {
      alert("Erro ao salvar: " + err.message);
    }

    setLoading(false);
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
      <button type="submit" disabled={loading}>
        {loading ? "Salvando..." : formData.id ? "Atualizar" : "Salvar"}
      </button>
    </form>
  );
}
