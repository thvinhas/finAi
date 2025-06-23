// import DashBoardLayout from "../components/Layout/Layout";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  balanceTotal,
  GetTotalByCategorias,
  getTypeTotal,
} from "../services/dashboardService";
import { useEffect, useState } from "react";
import { formatCurrency, transformToChartData } from "../utils/formatters";
import { PieChart } from "@mui/x-charts/PieChart";

export default function Dashboard() {
  const [totalbalance, seTotalbalance] = useState(null);
  const [receitaMes, setReceitaMes] = useState(null);
  const [despesaMes, setDespesaMes] = useState(null);
  const [despesaCategorias, setDespesaCategorias] = useState([]);
  const [receitasCategorias, setReceitasCategorias] = useState([]);

  useEffect(() => {
    async function fetchBalanceTotal() {
      const total = await balanceTotal();
      seTotalbalance(total);
    }
    async function fetchDespesasTotal() {
      const total = await getTypeTotal("despesa");
      setDespesaMes(total);
    }

    async function fetchReceitaMes() {
      const total = await getTypeTotal("receita");
      setReceitaMes(total);
    }
    async function fetchTotalByCategorias() {
      const totalReceita = await GetTotalByCategorias("receita");
      const totalDespesa = await GetTotalByCategorias("despesa");

      setDespesaCategorias(transformToChartData(totalDespesa));
      setReceitasCategorias(transformToChartData(totalReceita));
    }

    fetchTotalByCategorias();
    fetchReceitaMes();
    fetchBalanceTotal();
    fetchDespesasTotal();
  }, []);
  return (
    <>
      <Typography sx={{ marginBottom: 5 }} variant="h5">
        Dashboard
      </Typography>
      <Grid
        container
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ marginBottom: 2 }}
      >
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="body2" color="gray">
                  Saldo total
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {formatCurrency(totalbalance)}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: "#42a5f5", width: 40, height: 40 }}>
                <AccountBalanceIcon />
              </Avatar>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="body2" color="gray">
                  Receitas do mês
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {formatCurrency(receitaMes)}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: "#66bb6a", width: 40, height: 40 }}>
                <ArrowUpwardIcon />
              </Avatar>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="body2" color="gray">
                  Despesas do mês
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {formatCurrency(despesaMes)}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: "#ef5350", width: 40, height: 40 }}>
                <ArrowDownwardIcon />
              </Avatar>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography>Despesas Por Categorias</Typography>
              <PieChart
                series={[
                  {
                    data: despesaCategorias,
                    innerRadius: 30,
                    paddingAngle: 5,
                    cornerRadius: 5,
                  },
                ]}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography>Receitas Por Categorias</Typography>
              <PieChart
                series={[
                  {
                    data: receitasCategorias,
                    innerRadius: 30,
                    paddingAngle: 5,
                    cornerRadius: 5,
                  },
                ]}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
