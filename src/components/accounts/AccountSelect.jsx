import { useEffect, useState } from "react";
import { getUserAccounts } from "../../services/accountService";

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
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Selecione uma conta</option>
      {accounts.map((account) => (
        <option key={account.id} value={account.id}>
          {account.name}
        </option>
      ))}
    </select>
  );
}
