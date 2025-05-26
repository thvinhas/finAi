import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { useState } from "react";
// import { ThemeProvider, CssBaseline } from "@mui/material";
// import { getTheme } from "./theme/theme";

// import Layout from "./components/Layout/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Categoria from "./pages/category/List";
import Headbar from "./components/Layout/Headbar";
import Sidebar from "./components/Layout/Sidebar";
import { CssBaseline } from "@mui/material";
// import Formulario from "./pages/Formulario";

function App() {
  // const [mode, setMode] = useState("light");
  // const theme = useMemo(() => getTheme(mode), [mode]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <BrowserRouter>
      <CssBaseline />
      <Headbar toggleDrawer={toggleDrawer} />
      <Sidebar open={drawerOpen} toggleDrawer={toggleDrawer} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categoria" element={<Categoria />} />
        {/* <Route path="/formulario" element={<Formulario />} /> */}
      </Routes>
    </BrowserRouter>

    // <ThemeProvider theme={theme}>
    //   <CssBaseline />
    //   <BrowserRouter>
    //     <Headbar toggleDrawer={toggleDrawer} />
    //     <Sidebar open={drawerOpen} toggleDrawer={toggleDrawer} />
    //     <Routes>
    //       <Route path="/login" element={<Login />} />
    //       <Route
    //         path="/*"
    //         element={
    //           <Layout mode={mode} setMode={setMode}>
    //             <Routes>
    //               <Route path="/dashboard" element={<Dashboard />} />
    //               <Route path="/categoria" element={<Categoria />} />
    //               {/* <Route path="/formulario" element={<Formulario />} /> */}
    //             </Routes>
    //           </Layout>
    //         }
    //       />
    //     </Routes>
    //   </BrowserRouter>
    // </ThemeProvider>
  );
}

export default App;
