// import DashBoardLayout from "../components/Layout/Layout";

import { Container } from "@mui/material";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";

export default function Dashboard() {
  const logout = () => {
    console.log("hue");
    signOut(auth);
  };

  return (
    // <Container sx={{ mt: 10 }}>
    <h1>Dashboard</h1>
    // </Container>
  );
}
