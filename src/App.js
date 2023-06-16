import logo from "./logo.svg";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/MainLayout";
import ListadoPersonas from "./screens/ListadoPersonas";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<ListadoPersonas />} />
        {/* <Route path="/planilla/:id" element={<Planilla />} />
        <Route path="/talonarios" element={<Talonarios />} /> */}
      </Routes>
    </MainLayout>
  );
}

export default App;
