import { useEffect, useState } from "react";
import { archiveAccount, getUserAccounts } from "../../services/accountService";
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
import { formatCurrency } from "../../utils/formatters";

export default function AccountList() {
  const [accounts, setAccounts] = useState([]);
  const [editingAccounts, setEditingAccounts] = useState(null);

  const fetchAccounts = async () => {
    const data = await getUserAccounts();
    setAccounts(data);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleArchive = async (id) => {
    const confirm = window.confirm(
      "Tem certeza que deseja arquivar essa categoria?"
    );
    if (confirm) {
      try {
        console.log(id);
        await archiveAccount(id);
        fetchAccounts();
      } catch (error) {
        alert("Erro ao arquivar conta: " + error.message);
      }
    }
  };

  const getAmountStyle = (value) => ({
    color: value >= 0 ? "green" : "red",
    fontWeight: "bold",
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Conta</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell align="left">Acoes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.length > 0 ? (
            accounts.map((account) => (
              <TableRow
                key={account.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{account.name}</TableCell>
                <TableCell align="left" style={getAmountStyle(account.balance)}>
                  {formatCurrency(account.balance)}
                </TableCell>
                <TableCell align="left">
                  <TableOptions
                    url={`/contas/${account.id}/editar`}
                    handleArchive={() => handleArchive(account.id)}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>Nenhuma conta cadastrada.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
