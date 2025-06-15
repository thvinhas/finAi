// components/TransactionItem.jsx
import { useEffect, useState } from "react";
import { getAccountById } from "../../services/accountService"; // Função que busca conta pelo ID
import TransactionActions from "./TransactionActions";
import { getCategoryById } from "../../services/categoryService";

export default function TransactionItem({ transaction, onUpdate, onEdit }) {
  const { title, amount, type, date, categoryId, accountId } = transaction;
  const [accountName, setAccountName] = useState("Carregando...");
  const [categoryName, setCategoryName] = useState("Carregando...");

  useEffect(() => {
    const fetchAccount = async () => {
      if (accountId) {
        try {
          const account = await getAccountById(accountId);

          setAccountName(account?.name || "Conta não encontrada");
        } catch {
          setAccountName("Erro ao buscar conta");
        }
      } else {
        setAccountName("Nenhuma conta");
      }
    };
    const fetchCategory = async () => {
      if (categoryId) {
        try {
          const category = await getCategoryById(categoryId);
          setCategoryName(category?.name || "Categoria nao encontrada");
        } catch (e) {
          console.log(e);

          setCategoryName("Erro ao buscar categoria");
        }
      } else {
        setCategoryName("nenhuma categoria encontrada");
      }
    };

    fetchAccount();
    fetchCategory();
  }, [accountId, categoryId]);

  return (
    <div style={{ border: "1px solid #ccc", padding: "8px", margin: "8px 0" }}>
      <div>
        <strong>{title}</strong> - R${amount} ({type})
      </div>
      <div>
        {categoryName} - {accountName} - {new Date(date).toLocaleDateString()}
      </div>
      <TransactionActions
        onEdit={onEdit}
        transaction={transaction}
        onUpdate={onUpdate}
      />
    </div>
  );
}
