import { useEffect, useState } from "react";
import { getUserAccounts } from "../../services/accountService";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function AccountSelect({ value, onChange }) {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const loadAccounts = async () => {
      const userAccounts = await getUserAccounts();
      setAccounts(userAccounts);
    };

    loadAccounts();
  });

  return (
    <FormControl fullWidth>
      <InputLabel id="conta_label">Conta</InputLabel>
      <Select
        labelId="conta_label"
        id="tipo"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="standard"
        fullWidth
        label="Tipo"
      >
        {accounts.map((account) => (
          <MenuItem key={account.id} value={account.id}>
            {account.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
