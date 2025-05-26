import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { ArrowBack, Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

function Headbar({ toggleDrawer }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
        {location.pathname !== "/" && (
          <IconButton color="inherit" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Meu Sistema
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Headbar;
