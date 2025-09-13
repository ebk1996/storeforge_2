
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import AppRoutes from "./routes/AppRoutes";

export default function App(){
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <AppRoutes />
      </main>
    </BrowserRouter>
  );
}
