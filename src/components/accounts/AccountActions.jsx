import { deleteAccount } from "../../services/accountService";

export default function AccountActions({ account, onUpdate, onEdit }) {
  const handleDelete = async () => {
    if (window.confirm("Deseja realmente excluir?")) {
      await deleteAccount(account.id);
      onUpdate?.();
    }
  };
  return (
    <div>
      <button onClick={() => onEdit?.(account)}>Editar</button>
      <button onClick={handleDelete}>Excluir</button>
    </div>
  );
}
