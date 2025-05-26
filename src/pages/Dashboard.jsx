import DashBoardLayout from "../components/Layout/Layout";

import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";

export default function Dashboard() {
  const logout = () => {
    console.log("hue");
    signOut(auth);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bem-vindo ao seu sistema financeiro!</p>
    </div>
    // <div>
    //   <h1>Dashboard - finAi</h1>
    //   <CategoryList />
    //   <AccountList />
    //   <TransactionList />
    //   <button onClick={logout}>Sair</button>
    // </div>
  );
}
