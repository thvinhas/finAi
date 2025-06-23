import { getUserAccounts } from "./accountService";
import { getUserCategory } from "./categoryService";
import { filterTransactions } from "./transactionService";

const now = new Date();
const startDate = new Date(now.getFullYear(), now.getMonth(), 1); // dia 1 do mês
const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59); // último dia, até 23h59

export async function balanceTotal() {
  const accounts = await getUserAccounts();
  const totalBalance = accounts.reduce((total, account) => {
    return total + (account.balance || 0);
  }, 0);

  return totalBalance;
}

export async function getTypeTotal(type) {
  const accounts = await filterTransactions({
    startDate: startDate,
    endDate: endDate,
    type: type,
  });
  const balance = accounts.reduce((total, account) => {
    return total + (account.amount || 0);
  }, 0);

  return balance;
}

export async function GetTotalByCategorias(type) {
  const grouped = {};
  const categoriasMap = {};

  const categorias = (await getUserCategory()).map((categoria) => {
    categoriasMap[categoria.id] = categoria.name;
  });

  const transactions = await filterTransactions({
    startDate: startDate,
    endDate: endDate,
    type: type,
  });

  transactions.map((transaction) => {
    const categoryName =
      categoriasMap[transaction.categoryId] || "Sem Categoria";
    if (!grouped[categoryName]) grouped[categoryName] = 0;
    grouped[categoryName] += transaction.amount;
  });

  return grouped;
}
