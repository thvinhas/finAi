// components/TransactionList.jsx
import { useEffect, useState } from "react";
import { getUserTransactions } from "../../services/transactionService";
import TransactionItem from "./TransactionItem";
import TransactionForm from "./TransactionForm";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const fetchTransactions = async () => {
    const data = await getUserTransactions();
    setTransactions(data);
    setEditingTransaction(null);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>{editingTransaction ? "Editar Transação" : "Nova Transação"}</h2>
      <TransactionForm
        initialData={editingTransaction}
        onSuccess={fetchTransactions}
      />

      <h2>Transações</h2>
      {transactions.map((tx) => (
        <TransactionItem
          key={tx.id}
          transaction={tx}
          onUpdate={fetchTransactions}
          onEdit={setEditingTransaction}
        />
      ))}
    </div>
  );
}
