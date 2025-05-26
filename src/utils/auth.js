import { getAuth } from "firebase/auth";

export function getCurrentUser() {
  const user = getAuth().currentUser;
  if (!user) throw new Error("Usuário não autenticado");
  return user;
}
