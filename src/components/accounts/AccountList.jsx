import { useEffect, useState } from "react";
import { getUserAccounts } from "../../services/accountService";
import AccountItem from "./AccountItem";
import AccountForm from "./AccountForm";

export default function AccountList() {
  const [accounts, setAccounts] = useState([]);
  const [editingAccounts, setEditingAccounts] = useState(null);

  const fetchAccounts = async () => {
    const data = await getUserAccounts();
    setAccounts(data);
    setEditingAccounts(false);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div>
      <h2>{editingAccounts ? "Editar Conta" : "Nova Conta"}</h2>
      <AccountForm initialData={editingAccounts} onSuccess={fetchAccounts} />

      <h2>Contas</h2>
      {accounts.map((tx) => (
        <AccountItem
          key={tx.id}
          account={tx}
          onUpdate={fetchAccounts}
          onEdit={setEditingAccounts}
        />
      ))}
    </div>
  );
}
