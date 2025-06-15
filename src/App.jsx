import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout/Layout";
import CategoryListPage from "./pages/category/CategoryListPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProtectedRoute>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/categorias" element={<CategoryListPage />} />
            </Routes>
          </Layout>
        </ProtectedRoute>
      </AuthProvider>
    </BrowserRouter>
  );
  //  <Routes>
  {
    /* <Route path="/login" element={<SignIn />} /> */
  }
  {
    /* <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* ROTAS PARA CATEGORIAS */
  }
  {
    /* <Route
          path="/categoria"
          element={
            <ProtectedRoute>
              <CategoryListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categorias/nova"
          element={
            <ProtectedRoute>
              <CategoryFormPage />
            </ProtectedRoute>
          }
        /> */
  }
  {
    /* <Route
          path="/categorias/:id/editar"
          element={
            <ProtectedRoute>
              <CategoryFormPage />
            </ProtectedRoute>
          }
        /> */
  }
  {
    /* ROTAS PARA CONTAS */
  }
  {
    /* <Route
          path="/conta"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute> */
  }
}
// />
{
  /* ROTAS PARA TRANSACOES */
}
{
  /* <Route
          path="/transacao"
          element={
            <ProtectedRoute>
              <Transaction />
            </ProtectedRoute>
          }
        />
      </Routes> */
}

export default App;
