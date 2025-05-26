import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Sidebar({ open, toggleDrawer }) {
  const navigate = useNavigate();
  return (
    <Drawer open={open} onClose={toggleDrawer}>
      <List>
        <ListItem
          button
          onClick={() => {
            navigate("/");
            toggleDrawer();
          }}
        >
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            navigate("/categoria");
            toggleDrawer();
          }}
        >
          <ListItemText primary="Categoria" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
