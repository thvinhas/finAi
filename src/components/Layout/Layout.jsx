// src/components/Layout.jsx
import { Box, Toolbar, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import Headbar from "./Headbar";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";

const drawerWidth = 240;

export default function Layout({ children, mode, setMode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Headbar onMenuClick={handleDrawerToggle} />
      <Sidebar
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, ml: isMobile ? 0 : `${drawerWidth}px` }}
      >
        <Toolbar />
        <ThemeToggle mode={mode} toggleTheme={toggleTheme} />
        {children}
      </Box>
    </Box>
  );
}
