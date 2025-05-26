import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, Loading } = useAuth();

  if (Loading) return <p>loading...</p>;

  return user ? children : <Navigate to="/login" replace />;
}
