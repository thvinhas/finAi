import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaidIcon from "@mui/icons-material/Paid";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";

const menuItens = [
  { id: 1, name: "Home", linkto: "/", icon: <HomeIcon /> },
  { id: 2, name: "Categorias", linkto: "/categorias", icon: <CategoryIcon /> },
  { id: 3, name: "Contas", linkto: "/contas", icon: <AccountBalanceIcon /> },
  { id: 4, name: "Transacoes", linkto: "/transacoes", icon: <PaidIcon /> },
];

export default function Menu() {
  return (
    <>
      <Toolbar />
      <Divider />
      <List>
        {menuItens.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton LinkComponent={Link} to={item.linkto}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}
