import { deleteTransaction } from "../../services/transactionService";

// components/TransactionActions.jsx
export default function TransactionActions({ transaction, onUpdate, onEdit }) {
  const handleDelete = async () => {
    if (window.confirm("Deseja realmente excluir?")) {
      await deleteTransaction(transaction.id);
      onUpdate?.();
    }
  };

  return (
    <div>
      <button onClick={() => onEdit?.(transaction)}>Editar</button>
      <button onClick={handleDelete}>Excluir</button>
    </div>
  );
}
