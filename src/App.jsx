import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout/Layout";
import CategoryListPage from "./pages/category/CategoryListPage";
import SignIn from "./pages/sign-in/SignIn";
import CategoryFormPage from "./pages/category/CategoryFormPage";
import AccountListPage from "./pages/account/AccountListPage";
import AccountFormPage from "./pages/account/AccountFormPage";
import TransactionListPage from "./pages/transaction/TransactionListPage";
import TransactionFormPage from "./pages/transaction/TransactionFormPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />} />
      </Routes>
      <AuthProvider>
        <ProtectedRoute>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              {/* ROTAS PARA AS CATEGORIAS */}
              <Route path="/categorias" element={<CategoryListPage />} />
              <Route path="/categorias/novo" element={<CategoryFormPage />} />
              <Route
                path="/categorias/:id/editar"
                element={<CategoryFormPage />}
              />
              {/* ROTAS PARA AS CONTAS */}
              <Route path="/contas" element={<AccountListPage />} />
              <Route path="/contas/novo" element={<AccountFormPage />} />
              <Route path="/contas/:id/editar" element={<AccountFormPage />} />
              {/* ROTAS PARA AS Transacoes */}
              <Route path="/transacoes" element={<TransactionListPage />} />
              <Route
                path="/transacoes/novo"
                element={<TransactionFormPage />}
              />
              <Route
                path="/transacoes/:id/editar"
                element={<TransactionFormPage />}
              />
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
