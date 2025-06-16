// components/TransactionList.jsx
import { useEffect, useState } from "react";
import { getUserTransactions } from "../../services/transactionService";
import TransactionItem from "./TransactionItem";
import TransactionForm from "./TransactionForm";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableOptions from "../utils/TableOptions";
import { getUserAccounts } from "../../services/accountService";
import { getUserCategory } from "../../services/categoryService";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchTransactions = async () => {
    const data = await getUserTransactions();
    setTransactions(data);
    setEditingTransaction(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const [transactionsData, accountsData, categoriesData] =
        await Promise.all([
          getUserTransactions(),
          getUserAccounts(),
          getUserCategory(),
        ]);
      setTransactions(transactionsData);
      setAccounts(accountsData);
      setCategories(categoriesData);
      setEditingTransaction(null);
    };

    fetchData();
  }, []);

  const getAccountName = (id) =>
    accounts.find((acc) => acc.id === id)?.name || "Conta";

  const getCategoryName = (id) =>
    categories.find((cat) => cat.id === id)?.name || "Categoria";

  const getAmountStyle = (type) => ({
    color: type === "receita" ? "green" : "red",
    fontWeight: "bold",
  });
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("pt-BR");

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Data</TableCell>
            <TableCell align="left">Descricao</TableCell>
            <TableCell align="left">Categoria</TableCell>
            <TableCell align="left">Conta</TableCell>
            <TableCell align="left">Valor</TableCell>
            <TableCell align="left">Acoes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">
                  {formatDate(transaction.date)}
                </TableCell>
                <TableCell align="left">{transaction.title}</TableCell>
                <TableCell align="left">
                  {getCategoryName(transaction.categoryId)}
                </TableCell>
                <TableCell align="left">
                  {getAccountName(transaction.accountId)}
                </TableCell>
                <TableCell
                  align="left"
                  style={getAmountStyle(transaction.type)}
                >
                  {transaction.amount}
                </TableCell>
                <TableCell align="left">
                  <TableOptions
                    url={`/contas/${transaction.id}/editar`}
                    handleArchive={() => handleArchive(transaction.id)}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>Nenhuma transacao cadastrada.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
